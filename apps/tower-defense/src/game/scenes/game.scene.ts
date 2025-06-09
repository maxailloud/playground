import AssetKey from '@game/entity/asset-key';
import Enemy from '@game/entity/enemy';
import Tower from '@game/entity/tower';
import WaveConfig from '@game/entity/wave-config';
import GameEventManager from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import CannonTower from '@game/prefabs/cannon-tower';
import GameOverScene from '@game/scenes/game-over.scene';
import WaveSpawner from '@game/services/wave-spawner';
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    public static KEY = 'Game';

    private camera!: Phaser.Cameras.Scene2D.Camera;
    private map!: Phaser.Tilemaps.Tilemap;
    private controls!: Phaser.Cameras.Controls.FixedKeyControl;

    private waveSpawner!: WaveSpawner;
    private waveConfig!: Pick<WaveConfig, 'interval' | 'speed' | 'enemies'>;
    public towers: Tower[] = [];
    public enemies: Enemy[] = [];

    public exitPoint!: Phaser.GameObjects.Rectangle;
    public groundLayer!: Phaser.Tilemaps.TilemapLayer;
    public towerLayer!: Phaser.Tilemaps.TilemapLayer;
    public pointOfInterestLayer!: Phaser.Tilemaps.ObjectLayer;
    public selectedTowerPosition?: Phaser.Tilemaps.Tile;
    public spawnPoint!: Phaser.GameObjects.Rectangle;
    public graphics!: Phaser.GameObjects.Graphics;
    public path!: Phaser.Curves.Path;

    public constructor() {
        super({
            key: GameScene.KEY,
            physics: {
                arcade: {
                    debug: true,
                },
            },
        });
    }

    public init(): void {
        GameEventManager.on(GameEvents.GameStarted, () => {
            this.startGame();
        });

        GameEventManager.on(GameEvents.GamePaused, () => {
            console.log('game paused');
        });

        GameEventManager.on(GameEvents.GameEnded, () => {
            console.log('game ended');
            this.scene.start(GameOverScene.KEY);
        });
    }

    public create(): void {
        this.waveConfig = this.cache.json.get(AssetKey.WaveConfig);
        this.waveSpawner = new WaveSpawner();
        this.camera = this.cameras.main;
        this.map = this.add.tilemap(AssetKey.Map);
        this.pointOfInterestLayer = this.map.getObjectLayer(AssetKey.PointOfInterestObjectLayer) as Phaser.Tilemaps.ObjectLayer;

        const tileset = this.map.addTilesetImage(AssetKey.TowerDefenseTilesheet, AssetKey.TowerDefenseSpritesheet);

        if (tileset) {
            this.groundLayer = this.map.createLayer(AssetKey.GroundMapLayer, tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
            this.towerLayer = this.map.createLayer(AssetKey.TowersMapLayer, tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

            this.addPointOfInterestGameObject();
            this.addEnemyPath();
            this.addInputInScene();

            const cursors = this.input.keyboard?.createCursorKeys();

            if (cursors) {
                this.camera.setZoom(1);
                this.camera.centerOn(this.map.widthInPixels, this.map.heightInPixels);
                this.camera.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);

                const fixedKeyControlConfig: Phaser.Types.Cameras.Controls.FixedKeyControlConfig = {
                    camera: this.camera,
                    left: cursors.left,
                    right: cursors.right,
                    up: cursors.up,
                    down: cursors.down,
                    speed: 0.5,
                };

                this.controls = new Phaser.Cameras.Controls.FixedKeyControl(fixedKeyControlConfig);
            }
        }

        if (this.path) {
            this.graphics = this.add.graphics();
            this.graphics.lineStyle(2, 0xffffff, 1);

            this.path.draw(this.graphics, 4);
        }

        GameEventManager.emit(GameEvents.CurrentSceneReady, { key: GameScene.KEY, scene: this });
    }

    public override update(_time: number, delta: number): void {
        if (this.controls) {
            this.controls.update(delta);
        }
    }

    private startGame(): void {
        this.camera.pan(0, 0, undefined, undefined, undefined, (_camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
            if (1 === progress) {
                void this.waveSpawner.spawnWave(this, {
                    ...this.waveConfig,
                    ...{
                        path: this.path,
                        spawnPoint: { x: this.spawnPoint.x, y: this.spawnPoint.y },
                    },
                });
            }
        });
    }

    private addPointOfInterestGameObject(): void {
        const spawnPoint = this.pointOfInterestLayer.objects.find((tileObject) => tileObject.name === 'spawn-point');

        if (spawnPoint) {
            const tile = this.groundLayer?.getTileAtWorldXY(spawnPoint.x ?? 0, spawnPoint.y ?? 0, false, this.camera);

            if (tile) {
                this.spawnPoint = this.add.rectangle(tile.getCenterX(), tile.getTop(), 64, 1, 0xffffff);
            }
        }

        const exitPoint = this.pointOfInterestLayer.objects.find((tileObject) => tileObject.name === 'exit-point');

        if (exitPoint) {
            const tile = this.groundLayer?.getTileAtWorldXY(exitPoint.x ?? 0, exitPoint.y ?? 0, false, this.camera);

            if (tile) {
                this.exitPoint = this.add.rectangle(tile.getCenterX(), tile.getBottom() - 1, 64, 1, 0xffffff);

                this.physics.add.existing(this.exitPoint);
            }
        }
    }

    private addEnemyPath(): void {
        const pathObject = this.pointOfInterestLayer.objects.find((tileObject) => tileObject.name === 'path');

        if (pathObject && pathObject.polyline && 0 < pathObject.polyline.length) {
            const path = this.add.path(this.spawnPoint.x ?? 0, this.spawnPoint.y ?? 0);
            path.name = 'path';

            this.add.circle(path.getStartPoint().x, path.getStartPoint().y, 10, 0xa83232);

            const polylines = pathObject.polyline;
            polylines.forEach((line) => {
                const tilePosition = path.getStartPoint().clone().add(new Phaser.Math.Vector2(line.x, line.y));
                const tile = this.groundLayer?.getTileAtWorldXY(tilePosition.x, tilePosition.y, false, this.camera);

                if (tile) {
                    path.lineTo(new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY()));
                    this.add.circle(tile.getCenterX(), tile.getCenterY(), 10, 0xa83232);
                } else {
                    console.log('tile not found');
                }
            });

            path.lineTo(this.exitPoint.x, this.exitPoint.y);
            this.add.circle(this.exitPoint.x, this.exitPoint.y, 10, 0xa83232);

            this.path = path;
        }
    }

    private addInputInScene(): void {
        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown) {
                this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
                this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
            }
        });

        this.input.on(
            Phaser.Input.Events.POINTER_WHEEL,
            (_pointer: Phaser.Input.Pointer, _target: Phaser.GameObjects.GameObject, _deltaX: number, deltaY: number) => {
                this.camera.scrollY += deltaY;
            },
        );

        this.input.on(
            Phaser.Input.Events.POINTER_UP,
            (pointer: Phaser.Input.Pointer) => {
                const tile = this.towerLayer?.getTileAtWorldXY(pointer.worldX, pointer.worldY, false, this.camera);

                if (tile) {
                    if (!this.selectedTowerPosition) {
                        this.scale.resize(this.scale.width, this.scale.height - 100);
                    }

                    this.selectedTowerPosition = tile;

                    // need to save the tower to be able to retrieve it later and not create a new one on top of it
                    const cannonTower = new CannonTower(this, tile.getCenterX(), tile.getCenterY());
                    this.add.existing(cannonTower);
                    this.towers.push(cannonTower);

                    GameEventManager.emit('tower-selected', { tile });
                } else {
                    if (this.selectedTowerPosition) {
                        this.scale.resize(this.scale.width, this.scale.height + 100);
                    }

                    this.selectedTowerPosition = undefined;

                    GameEventManager.emit('tower-selected', { tile: undefined });
                }

                this.towers.forEach((tower) => tower.shot());
            },
            this,
        );
    }

    public setEnemies(enemies: Enemy[]): void {
        this.enemies = enemies;
    }

    public enemyHasExitedMap(
        enemy:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
        exitPoint:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
    ): void {
        console.log('EnemyExitsMap', enemy, exitPoint);
        // remove hp from player
    }

    public updateTowersRange(): void {
        console.log('updateTowersRange');

        this.towers.map((tower) => tower.updateRange());
    }

    public enemyHasEnteredTowerRange(
        enemy:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
        exitPoint:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
    ): void {
        console.log('enemyHasEnteredTowerRange', enemy, exitPoint);
    }
}

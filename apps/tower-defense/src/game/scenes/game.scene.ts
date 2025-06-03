import EnemyType from '@game/entity/enemy-type';
import GameEventManager from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import GameOverScene from '@game/scenes/game-over.scene';
import WaveSpawner from '@game/services/wave-spawner';
import { Scene } from 'phaser';

export default class GameScene extends Scene {
    public static KEY = 'Game';

    private camera!: Phaser.Cameras.Scene2D.Camera;
    private map!: Phaser.Tilemaps.Tilemap;
    private controls!: Phaser.Cameras.Controls.FixedKeyControl;

    private waveSpawner!: WaveSpawner;

    private groundLayer?: Phaser.Tilemaps.TilemapLayer | undefined;
    private towerLayer?: Phaser.Tilemaps.TilemapLayer | undefined;
    private pointOfInterestLayer?: Phaser.Tilemaps.ObjectLayer | undefined;
    private selectedTower?: Phaser.Tilemaps.Tile | undefined;
    private spawnPoint?: Phaser.GameObjects.Rectangle | undefined;
    private exitPoint?: Phaser.GameObjects.Rectangle | undefined;
    private graphics?: Phaser.GameObjects.Graphics | undefined;
    private path?: Phaser.Curves.Path | undefined;
    private enemies?: Phaser.GameObjects.PathFollower[] = [];

    public constructor() {
        super(GameScene.KEY);
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
        this.waveSpawner = new WaveSpawner();
        this.camera = this.cameras.main;
        this.map = this.add.tilemap('map');
        this.pointOfInterestLayer = this.map.getObjectLayer('point-of-interest') ?? undefined;

        const tileset = this.map.addTilesetImage('tower-defense-tilesheet', 'tower-defense');

        if (tileset) {
            this.groundLayer = this.map.createLayer('Ground', tileset, 0, 0) ?? undefined;

            if (this.groundLayer) {
                this.towerLayer = this.map.createLayer('Towers', tileset, 0, 0) ?? undefined;

                this.addPointOfInterestGameObject();
                this.addEnemyPath();
                this.addInputInScene();

                const cursors = this.input.keyboard?.createCursorKeys();

                if (cursors && this.groundLayer) {
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
        }

        if (this.path) {
            this.graphics = this.add.graphics();
            this.graphics.lineStyle(2, 0xffffff, 1);

            this.path.draw(this.graphics, 4);
        }

        GameEventManager.emit('current-scene-ready', { key: GameScene.KEY, scene: this });
    }

    public override update(time: number, delta: number): void {
        if (this.controls) {
            this.controls.update(delta);
        }
    }

    private startGame(): void {
        this.camera.pan(0, 0, undefined, undefined, undefined,
            (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                if (1 === progress) {
                    if (this.path && this.spawnPoint) {
                        void this.waveSpawner.spawnWave(this, {
                            speed: 10000,
                            interval: 500,
                            enemies: [
                                { type: EnemyType.Basic },
                                { type: EnemyType.Basic },
                                { type: EnemyType.Basic },
                                { type: EnemyType.Basic },
                                { type: EnemyType.Basic },
                                { type: EnemyType.Basic },
                                { type: EnemyType.Basic },
                                { type: EnemyType.AdvancedInfantry },
                                { type: EnemyType.EvolvedInfantry },
                                { type: EnemyType.FuturisticInfantry },
                            ],
                            path: this.path,
                            spawnPoint: { x: this.spawnPoint.x, y: this.spawnPoint.y },
                        });
                    }
                }
        });
    }

    private addPointOfInterestGameObject(): void {
        if (this.pointOfInterestLayer) {
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
                }
            }
        }
    }

    private addEnemyPath(): void {
        if (this.pointOfInterestLayer && this.spawnPoint && this.exitPoint) {
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
            (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject, deltaX: number, deltaY: number) => {
                this.camera.scrollY += deltaY;
            },
        );

        this.input.on(
            Phaser.Input.Events.POINTER_UP,
            (pointer: Phaser.Input.Pointer) => {
                const tile = this.towerLayer?.getTileAtWorldXY(pointer.worldX, pointer.worldY, false, this.camera);

                if (tile) {
                    if (!this.selectedTower) {
                        this.scale.resize(this.scale.width, this.scale.height - 100);
                    }

                    this.selectedTower = tile;

                    GameEventManager.emit('tower-selected', { tile });
                } else {
                    if (this.selectedTower) {
                        this.scale.resize(this.scale.width, this.scale.height + 100);
                    }

                    this.selectedTower = undefined;

                    GameEventManager.emit('tower-selected', { tile: undefined });
                }
            },
            this,
        );
    }

    public setEnemies(enemies: Phaser.GameObjects.PathFollower[]): void {
        this.enemies = enemies;
    }
}

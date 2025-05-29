import { GameEventManager } from '@game/game-event-manager';
import GameOverScene from '@game/scenes/game-over.scene';
import { Scene } from 'phaser';

export default class GameScene extends Scene {
    public static KEY = 'Game';

    private camera!: Phaser.Cameras.Scene2D.Camera;
    private gameOverText!: Phaser.GameObjects.Text;
    private map!: Phaser.Tilemaps.Tilemap;
    private controls!: Phaser.Cameras.Controls.FixedKeyControl;

    private towerLayer?: Phaser.Tilemaps.TilemapLayer | undefined;
    private selectedTower?: Phaser.Tilemaps.Tile | undefined;

    public constructor() {
        super(GameScene.KEY);
    }

    public init(): void {
        GameEventManager.on('game-started', () => {
            console.log('game started');
            //const wave = this.waveCreator.createWave();
            //wave.spawnEnemies(currentScene);
        });
        GameEventManager.on('game-paused', () => {
            console.log('game paused');
        });
    }

    public create(): void {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.gameOverText = this.add
            .text(512, 384, 'Game Over', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100);
        this.gameOverText
            .setInteractive(
                new Phaser.Geom.Rectangle(0, 0, this.gameOverText.width, this.gameOverText.height),
                Phaser.Geom.Rectangle.Contains,
            )
            .on('pointerdown', () => {
                this.scene.start(GameOverScene.KEY);
            });

        this.map = this.add.tilemap('map');

        const tileset = this.map.addTilesetImage('tower-defense-tilesheet', 'tower-defense');

        if (tileset) {
            const groundLayer = this.map.createLayer('Ground', tileset, 0, 0);

            if (groundLayer) {
                this.towerLayer = this.map.createLayer('Towers', tileset, 0, 0) ?? undefined;

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
                        const tile = this.map.getTileAtWorldXY(
                            pointer.worldX,
                            pointer.worldY,
                            false,
                            this.camera,
                            this.towerLayer,
                        );

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

                const cursors = this.input.keyboard?.createCursorKeys();

                if (cursors) {
                    this.camera.setZoom(1);
                    this.camera.centerOn(this.map.widthInPixels, this.map.heightInPixels);
                    this.camera.setBounds(0, 0, groundLayer.width, groundLayer.height);

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

        GameEventManager.emit('current-scene-ready', {key: GameScene.KEY, scene: this});
    }

    public override update(time: number, delta: number): void {
        if (this.controls) {
            this.controls.update(delta);
        }
    }
}

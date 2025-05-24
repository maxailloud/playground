import GameOverScene from '@game/scenes/game-over.scene';
import { Scene } from 'phaser';
import * as dat from 'dat.gui';

export default class GameScene extends Scene {
    public static KEY = 'Game';

    private camera!: Phaser.Cameras.Scene2D.Camera;
    private background!: Phaser.GameObjects.Image;
    private gameText!: Phaser.GameObjects.Text;
    private map!: Phaser.Tilemaps.Tilemap;
    private controls!: Phaser.Cameras.Controls.FixedKeyControl;
    private gui!: dat.GUI;

    public constructor() {
        super(GameScene.KEY);
    }

    public init(): void {
        this.events.once('destroy', () => {
            this.gui.hide();
        });
        this.events.once('shutdown', () => {
            this.gui.hide();
        });
    }

    public create(): void {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add
            .text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100);
        this.gameText
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, this.gameText.width, this.gameText.height), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.scene.start(GameOverScene.KEY);
            });

        this.map = this.add.tilemap('level-1');

        const tileset = this.map.addTilesetImage('tower-defense-tilesheet', 'tower-defense');

        if (tileset) {
            // Parameters: layer name (or index) from Tiled, tileset, x, y
            this.map.createLayer('Ground', tileset, 0, 0);
            this.map.createLayer('Turrets', tileset, 0, 0);
        }

        this.input.on(
            'wheel',
            (pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject, deltaX: number, deltaY: number) => {
                if (deltaY > 0) {
                    const newZoom = this.camera.zoom - 0.1;

                    if (newZoom > 0.5) {
                        this.camera.zoom = newZoom;
                    }
                }

                if (deltaY < 0) {
                    const newZoom = this.camera.zoom + 0.1;

                    if (newZoom <= 1) {
                        this.camera.zoom = newZoom;
                    }
                }
            },
        );

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!pointer.isDown) return;

            this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
            this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
        });

        const cursors = this.input.keyboard?.createCursorKeys();

        if (cursors) {
            this.camera.setZoom(1);
            // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
            this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

            const fixedKeyControlConfig: Phaser.Types.Cameras.Controls.FixedKeyControlConfig = {
                camera: this.camera,
                left: cursors.left,
                right: cursors.right,
                up: cursors.up,
                down: cursors.down,
                zoomIn: this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
                zoomOut: this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.E),
                speed: 0.5,
            };

            this.controls = new Phaser.Cameras.Controls.FixedKeyControl(fixedKeyControlConfig);
        }

        this.gui = new dat.GUI();

        const help = {
            line1: 'Cursors to move',
            line2: 'Q & E to zoom',
        };

        const cameraFolder = this.gui.addFolder('Camera');
        cameraFolder.add(this.camera, 'zoom', 0.1, 2).step(0.1).listen();
        cameraFolder.add(help, 'line1');
        cameraFolder.add(help, 'line2');
        cameraFolder.open();
    }

    public override update(time: number, delta: number): void {
        if (this.controls) {
            this.controls.update(delta);
        }
    }
}

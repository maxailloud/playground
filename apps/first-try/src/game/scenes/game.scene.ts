import GameOverScene from '@game/scenes/game-over.scene';
import { Scene } from 'phaser';

export default class GameScene extends Scene {
    public static KEY = 'Game';

    private camera!: Phaser.Cameras.Scene2D.Camera;
    private background!: Phaser.GameObjects.Image;
    private gameText!: Phaser.GameObjects.Text;

    public constructor() {
        super(GameScene.KEY);
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
    }
}

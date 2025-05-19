import GameScene from '@game/scenes/game.scene';
import { GameObjects, Scene } from 'phaser';

export default class MainMenuScene extends Scene {
    public static KEY = 'MainMenu';

    private background!: GameObjects.Image;
    private logo!: GameObjects.Image;
    private title!: GameObjects.Text;

    public constructor() {
        super(MainMenuScene.KEY);
    }

    public create(): void {
        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 300, 'logo').setDepth(100);
        this.title = this.add
            .text(512, 460, 'Main Menu', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100)
        ;
        this.title
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, this.title.width, this.title.height), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.scene.start(GameScene.KEY);
            });
    }
}

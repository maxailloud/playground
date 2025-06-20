import GameEventManager from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import GameScene from '@game/scenes/game.scene';
import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    public static KEY = 'MainMenu';

    private background!: Phaser.GameObjects.Image;
    private logo!: Phaser.GameObjects.Image;
    private title!: Phaser.GameObjects.Text;

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
            .setDepth(100);
        this.title
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, this.title.width, this.title.height), Phaser.Geom.Rectangle.Contains)
            .on('pointerup', () => {
                this.scene.start(GameScene.KEY);
            });

        this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).on('up', () => {
            this.scene.start(GameScene.KEY);
        });

        GameEventManager.emit(GameEvents.CurrentSceneReady, { key: MainMenuScene.KEY, scene: this });
    }
}

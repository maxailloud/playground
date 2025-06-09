import GameEventManager from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import MainMenuScene from '@game/scenes/main-menu.scene';
import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    public static KEY = 'GameOver';

    private camera!: Phaser.Cameras.Scene2D.Camera;
    private background!: Phaser.GameObjects.Image;
    private gameOverText!: Phaser.GameObjects.Text;

    public constructor() {
        super(GameOverScene.KEY);
    }

    public create(): void {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameOverText = this.add
            .text(512, 384, 'Game Over', {
                fontFamily: 'Arial Black',
                fontSize: 64,
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
                this.scene.start(MainMenuScene.KEY);
            });

        GameEventManager.emit(GameEvents.CurrentSceneReady, { key: GameOverScene.KEY, scene: this });
    }
}

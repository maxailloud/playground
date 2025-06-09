import GameEventManager from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import PreloaderScene from '@game/scenes/preloader.scene';
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    public static KEY = 'Boot';

    public constructor() {
        super({
            key: BootScene.KEY,
            pack: {
                files: [{ type: 'image', cache: false, key: 'background', url: 'assets/bg.png' }],
            },
        });
    }

    public create(): void {
        this.scene.start(PreloaderScene.KEY);

        GameEventManager.emit(GameEvents.CurrentSceneReady, { key: BootScene.KEY, scene: this });
    }
}

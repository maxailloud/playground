import GameEventManager from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import PreloaderScene from '@game/scenes/preloader.scene';
import { Scene } from 'phaser';

export default class BootScene extends Scene {
    public static KEY = 'Boot';

    public constructor() {
        super({
            key: BootScene.KEY,
            pack: {
                files: [{ type: 'image', key: 'background', url: 'assets/bg.png' }],
            },
        });
    }

    public create(): void {
        this.scene.start(PreloaderScene.KEY);

        GameEventManager.emit(GameEvents.CurrentSceneReady, { key: BootScene.KEY, scene: this });
    }
}

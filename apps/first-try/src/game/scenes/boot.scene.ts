import PreloaderScene from '@game/scenes/preloader.scene';
import { Scene } from 'phaser';

export default class BootScene extends Scene {
    public static KEY = 'Boot';

    public constructor() {
        super(BootScene.KEY);
    }

    public preload(): void {
        this.load.image('background', 'assets/bg.png');
    }

    public create(): void {
        this.scene.start(PreloaderScene.KEY);
    }
}

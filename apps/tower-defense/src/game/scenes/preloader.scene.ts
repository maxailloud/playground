import MainMenuScene from '@game/scenes/main-menu.scene';
import { Scene } from 'phaser';

export default class PreloaderScene extends Scene {
    public static KEY = 'Preloader';

    public constructor() {
        super(PreloaderScene.KEY);
    }

    public init(): void {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    public preload(): void {
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.spritesheet('tower-defense', 'tower-defense-tilesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.tilemapTiledJSON('map', 'map.json');
    }

    public create(): void {
        this.scene.start(MainMenuScene.KEY);
    }
}

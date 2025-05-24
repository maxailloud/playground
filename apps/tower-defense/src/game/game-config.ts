import { AUTO } from 'phaser';
import BootScene from '@game/scenes/boot.scene';
import GameOverScene from '@game/scenes/game-over.scene';
import PreloaderScene from '@game/scenes/preloader.scene';
import MainMenuScene from '@game/scenes/main-menu.scene';
import GameScene from '@game/scenes/game.scene';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const gameConfig: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    backgroundColor: '#028AF8',
    url: 'http//url.to.game',
    title: 'Tower Defense',
    version: '0.0.1',
    scale: {
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
    },
    scene: [BootScene, PreloaderScene, MainMenuScene, GameScene, GameOverScene],
};

export default gameConfig;

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
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028AF8',
    scene: [
        BootScene,
        PreloaderScene,
        MainMenuScene,
        GameScene,
        GameOverScene,
    ],
};

export default gameConfig;

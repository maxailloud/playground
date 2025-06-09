import Phaser from 'phaser';
import BootScene from '@game/scenes/boot.scene';
import GameOverScene from '@game/scenes/game-over.scene';
import PreloaderScene from '@game/scenes/preloader.scene';
import MainMenuScene from '@game/scenes/main-menu.scene';
import GameScene from '@game/scenes/game.scene';

console.log(window.devicePixelRatio);
console.log(window.innerWidth);
console.log(window.innerHeight);
console.log(window.innerWidth * window.devicePixelRatio);
console.log(window.innerHeight * window.devicePixelRatio);
console.log((window.innerHeight * window.devicePixelRatio)-100);
// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '0x00ff00',
    url: 'http//url.to.game',
    title: 'Tower Defense',
    version: '0.0.1',
    pixelArt: true,
    scale: {
        parent: 'game-container',
        width: 1024 > window.innerWidth ? window.innerWidth : 1024,
        height: window.innerHeight - 100,
    },
    scene: [
        BootScene,
        PreloaderScene,
        MainMenuScene,
        GameScene,
        GameOverScene,
    ],
    render: {
        transparent: false,
    },
};

export default gameConfig;

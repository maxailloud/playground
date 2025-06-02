import { Injectable, signal } from '@angular/core';
import gameConfig from '@game/game-config';
import { GameEventManager } from '@game/game-event-manager';
import GameEvents from '@game/game-events';
import { Game } from 'phaser';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private gameInstance?: Game;

    public currentScene = signal<Phaser.Scene|undefined>(undefined);
    public currentKey = signal<string|undefined>(undefined);
    public isTowerSelected = signal<boolean>(false);

    public initialiseGame(): void {
        this.gameInstance = new Game(gameConfig);

        this.initialiseEvents();
    }

    public destroyGame(): void {
        if (this.gameInstance) {
            this.gameInstance.destroy(true);
        }
    }

    public startGame(): void {
        GameEventManager.emit(GameEvents.GameStarted);
    }

    public pauseWave(): void {
        GameEventManager.emit(GameEvents.GamePaused);
    }

    public endGame(): void {
        GameEventManager.emit(GameEvents.GameEnded);
    }

    public setCurrentScene(key: string, scene: Phaser.Scene): void {
        this.currentKey.set(key);
        this.currentScene.set(scene);
    }

    private initialiseEvents(): void {
        GameEventManager.on('current-scene-ready', (data: { key: string, scene: Phaser.Scene }) => {
            this.setCurrentScene(data.key, data.scene);
        });

        GameEventManager.on('tower-selected', (data: { tile: Phaser.Tilemaps.Tile }) => {
            this.isTowerSelected.set(undefined !== data.tile);
        });
    }
}

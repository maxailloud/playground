import { Injectable } from '@angular/core';
import gameConfig from '@game/game-config';
import { Game, Scene } from 'phaser';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private gameInstance?: Game;

    public startGame(): void {
        this.gameInstance = new Game(gameConfig);
    }

    public getGameInstance(): Game {
        if (!this.gameInstance) {
            throw new Error('Game not instantiated');
        }

        return this.gameInstance;
    }

    public destroyGame(): void {
        if (this.gameInstance) {
            this.gameInstance.destroy(true);
        }
    }

    public getCurrentScene(): Scene {
        let currentScene: Scene | undefined;

        for (const sceneKey in this.getGameInstance().scene.keys) {
            if (this.getGameInstance().scene.keys[sceneKey].scene.isActive(sceneKey)) {
                currentScene = this.getGameInstance().scene.keys[sceneKey];
            }
        }

        if (!currentScene) {
            throw new Error('No current scene');
        }

        return currentScene;
    }
}

import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import GameScene from '@game/scenes/game.scene';
import { GameService } from './game.service';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        PhaserGameComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private gameService = inject(GameService);

    public gameRunning = signal(false);
    public isTowerSelected = linkedSignal(() => this.gameService.isTowerSelected());
    public currentSceneIsGameScene = linkedSignal(() => GameScene.KEY === this.gameService.currentKey());

    public startGame(): void {
        this.gameRunning.set(true);
        this.gameService.startGame();
    }

    public pauseGame(): void {
        this.gameRunning.set(false);
        this.gameService.pauseWave();
    }

    public endGame(): void {
        this.gameService.endGame();
    }
}

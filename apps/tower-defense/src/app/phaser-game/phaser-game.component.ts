import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
    selector: 'app-phaser-game',
    template: '<div id="game-container"></div>',
})
export class PhaserGameComponent implements OnInit, OnDestroy {
    public gameService = inject(GameService);

    public ngOnInit(): void {
        this.gameService.initialiseGame();
    }

    public ngOnDestroy(): void {
        this.gameService.destroyGame();
    }
}

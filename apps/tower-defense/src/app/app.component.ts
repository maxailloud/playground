import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhaserGameComponent } from './phaser-game.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [PhaserGameComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

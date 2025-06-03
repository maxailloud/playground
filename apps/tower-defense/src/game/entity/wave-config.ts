import WaveConfigEnemy from '@game/entity/wave-config-enemy';

export default interface WaveConfig {
    path: Phaser.Curves.Path;
    spawnPoint: { x: number; y: number };
    speed: number;
    interval: number;
    enemies: WaveConfigEnemy[];
}

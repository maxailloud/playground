import WaveConfig from '@game/entity/wave-config';
import EnemySpawner from '@game/services/enemy-spawner';
import WaveCreator from '@game/services/wave-creator';

export default class WaveSpawner {
    private waveCreator!: WaveCreator;
    private enemySpawner!: EnemySpawner;

    public constructor() {
        this.waveCreator = new WaveCreator();
        this.enemySpawner = new EnemySpawner();
    }

    public spawnWave(scene: Phaser.Scene, waveConfig: WaveConfig): void {
        console.log('spawnWave', waveConfig);

        const wave = this.waveCreator.createWave(waveConfig);
        this.enemySpawner.spawnEnemyFromWave(scene, wave);
    }
}

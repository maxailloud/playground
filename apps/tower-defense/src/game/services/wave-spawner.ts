import Wave from '@game/entity/wave';
import WaveConfig from '@game/entity/wave-config';
import GameScene from '@game/scenes/game.scene';
import EnemySpawner from '@game/services/enemy-spawner';

export default class WaveSpawner {
    private enemySpawner: EnemySpawner = new EnemySpawner();

    public spawnWave(scene: GameScene, waveConfig: WaveConfig): Wave {
        const wave = new Wave(scene, waveConfig);

        this.enemySpawner.spawnEnemyFromWave(wave);

        return wave;
    }
}

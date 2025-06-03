import Wave from '@game/entity/wave';
import WaveConfig from '@game/entity/wave-config';
import GameScene from '@game/scenes/game.scene';
import EnemySpawner from '@game/services/enemy-spawner';
import WaveCreator from '@game/services/wave-creator';

export default class WaveSpawner {
    private waveCreator: WaveCreator = new WaveCreator();
    private enemySpawner: EnemySpawner = new EnemySpawner();

    public spawnWave(scene: GameScene, waveConfig: WaveConfig): Wave {
        const wave = this.waveCreator.createWave(scene, waveConfig);
        scene.setEnemies(wave.enemies);

        this.enemySpawner.spawnEnemyFromWave(wave);

        return wave;
    }
}

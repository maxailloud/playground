import Wave from '@game/entity/wave';
import WaveConfig from '@game/entity/wave-config';
import GameScene from '@game/scenes/game.scene';

export default class WaveCreator {
    public createWave(scene: GameScene, waveConfig: WaveConfig): Wave {
        return new Wave(scene, waveConfig);
    }
}

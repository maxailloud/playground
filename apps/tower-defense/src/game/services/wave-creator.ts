import Wave from '@game/entity/wave';
import WaveConfig from '@game/entity/wave-config';

export default class WaveCreator {
    public createWave(scene: Phaser.Scene, waveConfig: WaveConfig): Wave {
        return new Wave(scene, waveConfig);
    }
}

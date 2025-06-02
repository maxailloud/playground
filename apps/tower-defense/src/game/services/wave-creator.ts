import Wave from '@game/entity/wave';
import WaveConfig from '@game/entity/wave-config';

export default class WaveCreator {
    public createWave(waveConfig: WaveConfig): Wave {
        console.log('create wave', waveConfig);
        return new Wave(waveConfig);
    }
}

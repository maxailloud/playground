import SpritesheetIndex from '@game/entity/spritesheet-index';
import Wave from '@game/entity/wave';

export default class EnemySpawner {
    public spawnEnemyFromWave(scene: Phaser.Scene, wave: Wave): void {
        console.log('spawnEnemyFromWave', wave.config);

        void scene.add.sprite(50, 450, 'tower-defense', SpritesheetIndex.Infantry1);
        void scene.add.sprite(100, 450, 'tower-defense', SpritesheetIndex.Infantry2);
        void scene.add.sprite(150, 450, 'tower-defense', SpritesheetIndex.Infantry3);
        void scene.add.sprite(200, 450, 'tower-defense', SpritesheetIndex.Infantry4);
    }
}

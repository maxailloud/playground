import EnemyType from '@game/entity/enemy-type';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import WaveConfig from '@game/entity/wave-config';

export default class Wave {
    public enemies: Phaser.GameObjects.PathFollower[] = [];

    public constructor(public scene: Phaser.Scene, public config: WaveConfig) {
        config.enemies.forEach((enemyConfig) => {
            this.enemies.push(new Phaser.GameObjects.PathFollower(
                scene,
                config.path,
                config.spawnPoint.x,
                config.spawnPoint.y,
                'tower-defense',
                this.getSpritesheetIndexFromEnemyType(enemyConfig.type)
            ));
        });
    }

    private getSpritesheetIndexFromEnemyType(enemyType: EnemyType): SpritesheetIndex {
        let enemyTypeSpritesheetIndex: SpritesheetIndex = SpritesheetIndex.BasicInfantry;

        switch (enemyType) {
            case EnemyType.Basic:
                enemyTypeSpritesheetIndex = SpritesheetIndex.BasicInfantry;
                break;
            case EnemyType.AdvancedInfantry:
                enemyTypeSpritesheetIndex = SpritesheetIndex.AdvancedInfantry;
                break;
            case EnemyType.EvolvedInfantry:
                enemyTypeSpritesheetIndex = SpritesheetIndex.EvolvedInfantry;
                break;
            case EnemyType.FuturisticInfantry:
                enemyTypeSpritesheetIndex = SpritesheetIndex.FuturisticInfantry;
                break;
        }

        return enemyTypeSpritesheetIndex;
    }
}

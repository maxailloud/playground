import EnemyType from '@game/entity/enemy-type';
import WaveConfig from '@game/entity/wave-config';
import Enemy from '@game/entity/enemy';
import AdvancedEnemy from '@game/prefabs/advanced-enemy';
import BasicEnemy from '@game/prefabs/basic-enemy';
import EvolvedEnemy from '@game/prefabs/evolved-enemy';
import FuturisticEnemy from '@game/prefabs/futuristic-enemy';
import GameScene from '@game/scenes/game.scene';

export default class Wave {
    public enemies: Enemy[] = [];

    public constructor(public scene: GameScene, public config: WaveConfig) {
        config.enemies.forEach((enemyConfig) => {
            const enemy = this.getEnemyPrefab(enemyConfig.type, scene, config.path, config.spawnPoint.x, config.spawnPoint.y);
            this.enemies.push(enemy);
        });
    }

    private getEnemyPrefab(enemyType: EnemyType, scene: GameScene, path: Phaser.Curves.Path, x: number, y: number): Enemy {
        switch (enemyType) {
            case EnemyType.Basic:
                return new BasicEnemy(scene, path, x, y);
            case EnemyType.AdvancedInfantry:
                return new AdvancedEnemy(scene, path, x, y);
            case EnemyType.EvolvedInfantry:
                return new EvolvedEnemy(scene, path, x, y);
            case EnemyType.FuturisticInfantry:
                return new FuturisticEnemy(scene, path, x, y);
        }
    }
}

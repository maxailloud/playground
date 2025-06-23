import Enemy from '@game/entity/enemy';
import Wave from '@game/entity/wave';

export default class EnemySpawner {
    public spawnEnemyFromWave(wave: Wave): void {
        let enemyCount = 0;

        wave.enemies.forEach((enemy) => {
            if (0 === enemyCount) {
                this.spawnEnemy(wave, enemy);
            } else {
                void wave.scene.time.addEvent({
                    delay: wave.config.interval * (enemyCount + 1),
                    callback: this.spawnEnemy,
                    args: [wave, enemy],
                    callbackScope: this,
                });
            }

            enemyCount++;
        });
    }

    public spawnEnemy(wave: Wave, enemy: Enemy): void {
        wave.scene.add.existing(enemy);

        enemy.startFollow({
            duration: enemy.speed,
            onComplete: () => {
                enemy.destroy();
            }
        });
    }
}

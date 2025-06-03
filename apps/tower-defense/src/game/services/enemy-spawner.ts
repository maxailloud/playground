import Wave from '@game/entity/wave';

export default class EnemySpawner {
    public timerEvent!: Phaser.Time.TimerEvent;

    public spawnEnemyFromWave(wave: Wave): void {
        wave.enemies.forEach((enemy, index) => {
            void wave.scene.time.addEvent({
                delay: wave.config.interval * (index + 1),
                callback: this.spawnEnemy,
                args: [wave, enemy],
                callbackScope: this,
            });
        });
    }

    public spawnEnemy(wave: Wave, enemy: Phaser.GameObjects.PathFollower): void {
        wave.scene.add.existing(enemy);
        enemy.startFollow(wave.config.speed);
    }
}

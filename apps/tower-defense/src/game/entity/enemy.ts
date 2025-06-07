import Health from '@game/components/health.component';
import Speed from '@game/components/speed.component';
import AssetKey from '@game/entity/asset-key';
import GameScene from '@game/scenes/game.scene';

export default abstract class Enemy extends Phaser.GameObjects.PathFollower implements Speed, Health {
    public speed = 20000;
    public maxHealth = 3;
    public health = this.maxHealth;

    protected constructor(
        scene: GameScene,
        path: Phaser.Curves.Path,
        x: number,
        y: number,
        frame?: string | number,
    ) {
        super(scene, path, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        scene.physics.add.existing(this);
        scene.physics.add.overlap(this, scene.exitPoint, scene.enemyHasExitedMap);

        (this.body as Phaser.Physics.Arcade.Body).setCircle(16, 16, 16);
        (this.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x0099ff;

    }

    public override preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        console.log((this.body as Phaser.Physics.Arcade.Body).overlapR);

        if (0 < (this.body as Phaser.Physics.Arcade.Body).overlapR) {
            console.log('enemy overlapping with something');
        }
    }
}

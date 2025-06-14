import Health from '@game/components/health.component';
import Speed from '@game/components/speed.component';
import AssetKey from '@game/entity/asset-key';
import GameScene from '@game/scenes/game.scene';
import Phaser from 'phaser';
import { ulid } from 'ulid';

export default abstract class Enemy extends Phaser.GameObjects.PathFollower implements Speed, Health {
    public id = ulid();
    public speed = 20000;
    public maxHealth = 3;
    public health = this.maxHealth;

    protected constructor(public override scene: GameScene, path: Phaser.Curves.Path, x: number, y: number, frame?: string | number) {
        super(scene, path, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setCircle(16, 16, 16);
        (this.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x0099ff;
    }

    public override preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (this.scene.physics.overlap(
            this as Phaser.Types.Physics.Arcade.GameObjectWithBody,
            this.scene.exitPoint as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody,
        )) {
            console.log('EnemyExitsMap', this, this.scene.exitPoint);
            this.destroy();
            this.scene.enemies.delete(this.id);
        }
    }
}

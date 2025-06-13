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

    protected constructor(scene: GameScene, path: Phaser.Curves.Path, x: number, y: number, frame?: string | number) {
        super(scene, path, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        scene.physics.add.existing(this);
        console.log('pouet');
        scene.physics.add.overlap(
            this as Phaser.Types.Physics.Arcade.GameObjectWithBody,
            scene.exitPoint as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody,
            this.enemyHasExitedMap,
        );

        (this.body as Phaser.Physics.Arcade.Body).setCircle(16, 16, 16);
        (this.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x0099ff;
    }

    public override preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        const body = this.body as Phaser.Physics.Arcade.Body;
        console.log(this.body);
        console.log(body.touching.none, body.touching.up, body.touching.down, body.touching.left, body.touching.right, body.wasTouching);
        if (0 < (this.body as Phaser.Physics.Arcade.Body).overlapR) {
            console.log('enemy overlapping with something');
            console.log(body.overlapR);
        }
    }

    public enemyHasExitedMap(
        enemy:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
        exitPoint:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
    ): void {
        console.log('EnemyExitsMap', enemy, exitPoint);
        // remove hp from player
        enemy.destroy();
    }
}

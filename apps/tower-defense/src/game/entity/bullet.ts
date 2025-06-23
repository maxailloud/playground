import Speed from '@game/components/speed.component';
import AssetKey from '@game/entity/asset-key';
import Enemy from '@game/entity/enemy';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';
import Phaser from 'phaser';

export default class Bullet extends Phaser.GameObjects.Sprite implements Speed {
    public speed = 450;
    public isTracking = false;

    public constructor(scene: GameScene, x: number, y: number, frame: SpritesheetIndex, public target: Enemy) {
        super(scene, x, y-30, AssetKey.TowerDefenseSpritesheet, frame);

        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setCircle(8, 24, 24);
        (this.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x0099ff;
    }

    public override preUpdate(_time: number, _delta: number): void {
        if (this.isTracking) {
            this.rotation = Math.atan2(
                (this.body as Phaser.Physics.Arcade.Body).velocity.y,
                (this.body as Phaser.Physics.Arcade.Body).velocity.x
            );
        }

        this.scene.physics.moveToObject(this, this.target, this.speed);

        if (this.scene.physics.overlap(
            this as Phaser.Types.Physics.Arcade.GameObjectWithBody,
            this.target as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody,
        )) {
            console.log('Enemy got hit by bullet', this, this.target);
            // enemy should lose health
            this.destroy();
        }
    }
}

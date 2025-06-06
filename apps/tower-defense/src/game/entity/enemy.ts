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
        (this.body as Phaser.Physics.Arcade.Body).setSize(32, 32);

        scene.physics.add.collider(this, scene.exitPoint, scene.enemnyHasExitedMap);
    }
}

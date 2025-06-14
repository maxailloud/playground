import AssetKey from '@game/entity/asset-key';
import Enemy from '@game/entity/enemy';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';

export default class Bullet extends Phaser.GameObjects.Sprite {
    public constructor(scene: GameScene, x: number, y: number, frame: SpritesheetIndex, public target: Enemy) {
        super(scene, x, y, AssetKey.TowerDefenseSpritesheet, frame);
    }

    public override preUpdate(time: number, delta: number): void {
        console.log('bullet preUpdate');
        this.scene.physics.moveToObject(this.target, this, 100);
    }
}

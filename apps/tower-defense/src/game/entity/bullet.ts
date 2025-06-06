import AssetKey from '@game/entity/asset-key';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';

export default class Bullet extends Phaser.GameObjects.Sprite {
    public constructor(scene: GameScene, x: number, y: number, frame: SpritesheetIndex) {
        super(scene, x, y, AssetKey.TowerDefenseSpritesheet, frame);
    }

    public override preUpdate(time: number, delta: number): void {
        this.x += 10;

        if (this.x > 800) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

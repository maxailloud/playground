import AssetKey from '@game/entity/asset-key';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';

export default abstract class Tower extends Phaser.GameObjects.Sprite {
    protected constructor(scene: GameScene, x: number, y: number, frame?: string | number) {
        super(scene, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        this.setOrigin(0.5, 0.65);
        this.scene.add.sprite(x, y, AssetKey.TowerDefenseSpritesheet, SpritesheetIndex.BaseTower);
    }

    public override preUpdate(time: number, delta: number): void {
        this.rotation += 0.01;
    }

    public abstract shot(): void;
}

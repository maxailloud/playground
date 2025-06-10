import Range from '@game/components/range.component';
import AssetKey from '@game/entity/asset-key';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';
import Phaser from 'phaser';

export default abstract class Tower extends Phaser.GameObjects.Sprite implements Range {
    public rangeGameObject: Phaser.GameObjects.Arc;
    public range = 250;

    protected constructor(public override scene: GameScene, x: number, y: number, frame?: string | number) {
        super(scene, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        this.setOrigin(0.5, 0.65);
        this.scene.add.sprite(x, y, AssetKey.TowerDefenseSpritesheet, SpritesheetIndex.BaseTower);
        this.rangeGameObject = this.scene.add.circle(x, y, this.range, 0xa83232, 0.1);
        this.scene.physics.add.existing(this.rangeGameObject, false);
        (this.rangeGameObject.body as Phaser.Physics.Arcade.Body).setCircle(this.range);

        this.scene.enemies.forEach((enemy) =>
            this.scene.physics.add.overlap(
                this.rangeGameObject.body as Phaser.Physics.Arcade.Body,
                enemy.body as Phaser.Physics.Arcade.Body,
                this.enemyHasEnteredTowerRange,
            ),
        );
    }

    public override preUpdate(_time: number, _delta: number): void {
        this.rotation += 0.01;
    }

    public updateEnemies(): void {
        this.scene.enemies.forEach((enemy) =>
            this.scene.physics.add.overlap(
                this.rangeGameObject.body as Phaser.Physics.Arcade.Body,
                enemy.body as Phaser.Physics.Arcade.Body,
                this.enemyHasEnteredTowerRange,
            ),
        );
    }

    public enemyHasEnteredTowerRange(
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
        console.log('enemyHasEnteredTowerRange', enemy, exitPoint);
    }

    public abstract shot(): void;
}

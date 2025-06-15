import Range from '@game/components/range.component';
import AssetKey from '@game/entity/asset-key';
import Enemy from '@game/entity/enemy';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';
import Phaser from 'phaser';
import { ulid } from 'ulid';

export default abstract class Tower extends Phaser.GameObjects.Sprite implements Range {
    public id = ulid();
    public rangeGameObject: Phaser.GameObjects.Arc;
    public range = 250;
    public inRangeEnemies = new Map<string, Enemy>();

    protected constructor(public override scene: GameScene, x: number, y: number, frame?: string | number) {
        super(scene, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        this.rotation = 0;
        this.setOrigin(0.5, 0.65);

        this.scene.add.sprite(x, y, AssetKey.TowerDefenseSpritesheet, SpritesheetIndex.BaseTower);

        this.rangeGameObject = this.scene.add.circle(x, y, this.range, 0xa83232, 0.1);

        this.scene.physics.add.existing(this.rangeGameObject, false);

        (this.rangeGameObject.body as Phaser.Physics.Arcade.Body).setCircle(this.range);
    }

    public abstract shot(enemy: Enemy): void;

    public enemyIsInRange(enemy: Enemy): boolean {
        return this.scene.physics.overlap(
            enemy as Phaser.Types.Physics.Arcade.GameObjectWithBody,
            this.rangeGameObject as Phaser.Types.Physics.Arcade.GameObjectWithBody,
        );
    }

    public override preUpdate(_time: number, _delta: number): void {
        if (1 === this.inRangeEnemies.size) {
            const inRangeEnemy = this.inRangeEnemies.values().next().value;

            if (inRangeEnemy) {
                this.rotateTowardsEnemy(inRangeEnemy);
                this.shot(inRangeEnemy);
            }
        } else {
            this.inRangeEnemies.forEach((enemy) => {
                console.log('lets shoot that one', enemy.id);
                this.rotateTowardsEnemy(enemy);
                this.shot(enemy);
            });
        }
    }

    private rotateTowardsEnemy(enemy: Enemy): void {
        const angleBetweenTowerAndEnemy = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
        const ninetyFiveDegreeInRadiant  = Phaser.Math.DegToRad(90);
        this.rotation = angleBetweenTowerAndEnemy + ninetyFiveDegreeInRadiant;
    }

    public addEnemyInRange(enemy: Enemy): void {
        if (!this.inRangeEnemies.has(enemy.id)) {
            console.log('add enemy to in range');
            this.inRangeEnemies.set(enemy.id, enemy);
        }
    }

    public removeEnemyInRange(enemy: Enemy): void {
        if (this.inRangeEnemies.has(enemy.id)) {
            console.log('remove enemy to in range');
            this.inRangeEnemies.delete(enemy.id);
        }
    }
}

import Range from '@game/components/range.component';
import AssetKey from '@game/entity/asset-key';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';
import Phaser from 'phaser';

export default abstract class Tower extends Phaser.GameObjects.Sprite implements Range {
    public rangeGameObject: Phaser.GameObjects.Arc;
    public range = 250;
    public justEnteredEnemies = new Map();

    protected constructor(public override scene: GameScene, x: number, y: number, frame?: string | number) {
        super(scene, x, y, AssetKey.TowerDefenseSpritesheet, frame);

        this.setOrigin(0.5, 0.65);
        this.scene.add.sprite(x, y, AssetKey.TowerDefenseSpritesheet, SpritesheetIndex.BaseTower);
        this.rangeGameObject = this.scene.add.circle(x, y, this.range, 0xa83232, 0.1);
        this.scene.physics.add.existing(this.rangeGameObject, false);
        (this.rangeGameObject.body as Phaser.Physics.Arcade.Body).setCircle(this.range);

        this.scene.enemies.forEach((enemy) =>
            this.scene.physics.add.overlap(
                this.rangeGameObject as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody,
                enemy as Phaser.Types.Physics.Arcade.GameObjectWithBody,
                this.enemyHasEnteredTowerRange,
            ),
        );
    }

    public override preUpdate(_time: number, _delta: number): void {
        this.rotation += 0.01;
        const touching = !(this.rangeGameObject as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody).body.touching.none;
        const wasTouching = !(this.rangeGameObject as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody).body.wasTouching.none;

        if (touching && !wasTouching) {
            console.log('overlap start');
        }
        if (!touching && wasTouching) {
            console.log('overlap end');
        }
    }

    public updateEnemies(): void {
        this.scene.enemies.forEach((enemy) =>
            this.scene.physics.add.overlap(
                this.rangeGameObject as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody,
                enemy as Phaser.Types.Physics.Arcade.GameObjectWithBody,
                this.enemyHasEnteredTowerRange,
            ),
        );
    }

    public enemyHasEnteredTowerRange(
        fireRange:
            Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
        enemy:
            Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Physics.Arcade.StaticBody
            | Phaser.Tilemaps.Tile,
    ): void {
        //console.log('enemyHasEnteredTowerRange', fireRange, enemy);
        fireRange = fireRange as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody;
        enemy = enemy as Phaser.Types.Physics.Arcade.GameObjectWithStaticBody;
        //const touching = !fireRange.body.touching.none;
        //const wasTouching = !fireRange.body.wasTouching.none;
        //const enemyTouching = !fireRange.body.touching.none;
        //const enemyWasTouching = !fireRange.body.wasTouching.none;

        //console.log(Object.keys(fireRange.body.touching));
        //console.log(Object.values(fireRange.body.touching));
        //console.log(Object.keys(enemy.body.touching));
        //console.log(Object.values(enemy.body.touching));
        //console.log(fireRange.body.wasTouching.none);
        //console.log(touching, wasTouching);
        //this.justEnteredEnemies.set(enemy.id)

        //if ('body' in enemy) {
        //    console.log(fireRange.body.embedded);
        //    console.log(fireRange.body.touching);
        //    console.log(fireRange.body.touching.none, fireRange.body.touching.up, fireRange.body.touching.down,
        //        fireRange.body.touching.left,
        //        fireRange.body.touching.right,
        //        fireRange.body.wasTouching);
            //console.log(enemy.body.embedded);
            //console.log(enemy.body.touching);
            //console.log(enemy.body.touching.none, enemy.body.touching.up, enemy.body.touching.down, enemy.body.touching.left,
            //    enemy.body.touching.right,
            //    enemy.body.wasTouching);
        //} else {
        //    if (!(enemy instanceof Phaser.Tilemaps.Tile)) {
        //        console.log(enemy.touching);
        //        console.log(enemy.touching.down, enemy.touching.left, enemy.touching.none, enemy.touching.right,
        //            enemy.touching.up);
        //        console.log(enemy.wasTouching.down, enemy.wasTouching.left, enemy.wasTouching.none, enemy.wasTouching.right,
        //            enemy.wasTouching.up);
        //        console.log(enemy.wasTouching);
        //
        //        if (enemy.touching && !enemy.wasTouching) console.log("overlapstart");
        //        if (!enemy.touching && enemy.wasTouching) console.log("overlapend");
        //    }
        //}
    }

    public abstract shot(): void;
}

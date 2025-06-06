import Bullet from '@game/entity/bullet';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import Tower from '@game/entity/tower';
import GameScene from '@game/scenes/game.scene';

export default class CannonTower extends Tower {
    public constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, SpritesheetIndex.CannonTower);
    }

    public override shot(): void {
        const bullet = new Bullet(this.scene as GameScene, this.x, this.y, SpritesheetIndex.BasicBullet);
        this.scene.add.existing(bullet);
    }
}

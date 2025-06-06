import Enemy from '@game/entity/enemy';
import SpritesheetIndex from '@game/entity/spritesheet-index';
import GameScene from '@game/scenes/game.scene';

export default class BasicEnemy extends Enemy {
    public override speed = 20000;

    public constructor(scene: GameScene, path: Phaser.Curves.Path, x: number, y: number) {
        super(scene, path, x, y, SpritesheetIndex.BasicInfantry);
    }
}

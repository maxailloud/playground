import SpritesheetIndex from '@game/entity/spritesheet-index';
import Tower from '@game/entity/tower';
import GameScene from '@game/scenes/game.scene';

export default class CannonTower extends Tower {
    public constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, SpritesheetIndex.CannonTower);
    }
}

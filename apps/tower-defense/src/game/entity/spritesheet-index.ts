const towerRow = (7 * 23);
const bulletRow = (11 * 23);
const infantryRow = (10 * 23);

enum SpritesheetIndex {
    BasicInfantry = infantryRow + 15,
    AdvancedInfantry = infantryRow + 16,
    EvolvedInfantry = infantryRow + 17,
    FuturisticInfantry = infantryRow + 18,
    CannonTower = infantryRow + 19,
    BaseTower = towerRow + 19,
    BasicBullet = bulletRow + 19,
}

export default SpritesheetIndex;

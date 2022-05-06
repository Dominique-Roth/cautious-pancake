export function handleTowersLoop() {
  // @ts-ignore
  const towers:StructureTower[] = _.filter(Game.structures,
    (structure) => structure.structureType == STRUCTURE_TOWER);
  for (const element of towers) {
    const tower: StructureTower = element;
    if (!tower)
      continue;
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }
    if (closestHostile)
      tower.attack(closestHostile);
  }
}

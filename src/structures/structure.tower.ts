import {getMainController} from "../utils/RoomUtils";

export function handleTowersLoop() {
  // @ts-ignore
  const towers: StructureTower[] = _.filter(Game.structures,
    (structure) => structure.structureType == STRUCTURE_TOWER);
  for (const element of towers) {
    const tower: StructureTower = element;
    if (!tower) continue;
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    let damagedStructures =
      tower.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return structure.hits === 1;
      }
    });
    if (damagedStructures.length == 0)
      tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL;
        }
      });
    if (damagedStructures.length == 0)
      damagedStructures = tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.hits < (getMainController().level < 7 ? (structure.hitsMax * 0.00001) : structure.hitsMax) && structure.structureType === STRUCTURE_WALL;
        }
      });
    if (closestHostile) {
      tower.attack(closestHostile);
    }
    if (damagedStructures.length > 0) {
      tower.repair(damagedStructures[0]);
    }
  }
}

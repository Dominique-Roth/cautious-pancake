import {getMainRoom} from "../../utils/RoomUtils";


export function mineNextEnergyResource(creep: Creep) {
  if (!creep.memory.harvestTarget) {
    /*
    Thanks to @Nalha_Saldana for this super useful snippet.
    Source: https://www.reddit.com/r/screeps/comments/5puufc/comment/dcu1nnb

    ToDo: Make compatible for multiple rooms.
     */
    const room = creep.room;
    const mineableSources = [];
    for (const source of room.find(FIND_SOURCES)) {
      let creepCount = 0;
      for (const creep of room.find(FIND_MY_CREEPS)) {
        if (creep.memory.harvestTarget === source.id) {
          creepCount++;
        }
      }
      if (creepCount < 2) {
        mineableSources.push(source);
      }
    }
    if (mineableSources.length > 0) {
      const newHarvestTarget = creep.pos.findClosestByPath(mineableSources);
      if (newHarvestTarget)
        creep.memory.harvestTarget = newHarvestTarget.id;
    }
  }
  const source = Game.getObjectById(creep.memory.harvestTarget as Id<Source>) as Source;
  const harvestResult = creep.harvest(source);
  if (harvestResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
  return true;
}

export function minersAlive(amount = 1): boolean {
  return ((_.filter(Game.creeps, (creep) => creep.memory.role == "miner.level1"
      || creep.memory.role == "miner.level2"))
    .length >= amount);
}

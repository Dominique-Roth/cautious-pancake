import { getMainRoom } from "../../utils/RoomUtils";

export function mineNextEnergyResource(creep: Creep) {
  if (!creep.memory.harvestTargetID
    || creep.memory.harvestTargetID > 1
    || creep.memory.harvestTargetID < 0) {
    creep.memory.harvestTargetID = Math.round(Math.random());
  }
  const source = creep.room.find(FIND_SOURCES)[creep.memory.harvestTargetID];
  const harvestResult = creep.harvest(source);
  if (harvestResult == ERR_NOT_IN_RANGE) {
    const moveResult = creep.moveTo(source);
    if (source.pos.isNearTo(creep.pos)
      || source.pos.findClosestByPath([creep.pos])
      || moveResult == ERR_NO_PATH) {
      creep.memory.harvestTargetID = <number>creep.memory.harvestTargetID + 1;
    }
    return true;
  }
  return true;
}

export function minersAlive(amount = 1): boolean {
  return ((_.filter(Game.creeps,
    (creep) =>
      creep.memory.role == "miner.level1"
      || creep.memory.role == "miner.level2"))
    .length >= amount);
}

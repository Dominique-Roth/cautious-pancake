import { pickupNearestRessource } from "./utils.carry";
import { mineNextEnergyResource, minersAlive } from "./utils.mine";

export function upgradeControllerDirectly(creep: Creep) {
  if (!creep.memory.upgrading
    && !creep.memory.working
    && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
    creep.memory.upgrading = true;
  if (creep.memory.upgrading
    && !creep.memory.working) {
    const upgradeResult = creep.upgradeController(<StructureController>creep.room.controller);
    if (upgradeResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(<StructureController>creep.room.controller,
        { visualizePathStyle: { stroke: "#ffff00" } });
      return true;
    }
  } else {
    if (minersAlive()) {
      pickupNearestRessource(creep);
      if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        creep.memory.upgrading = true;
      }
      return true;
    } else {
      mineNextEnergyResource(creep);
      return true;
    }
  }
  return false;
}

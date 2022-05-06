import {pickupNearestRessource} from "./utils.carry";
import {mineNextEnergyResource, minersAlive} from "./utils.mine";

export function upgradeControllerDirectly(creep: Creep) {
  if (!creep.memory.upgrading
    && !creep.memory.working
    && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
    creep.memory.upgrading = true;
  if (creep.memory.upgrading
    && !creep.memory.working) {
    const upgradeResult = creep.upgradeController(<StructureController>creep.room.controller);
    if (upgradeResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller as StructureController, {visualizePathStyle: {stroke: "#ffff00"}});
    } else if (upgradeResult === ERR_NOT_ENOUGH_RESOURCES) {
      creep.memory.upgrading = false;
    }
  } else {
    if (minersAlive()) {
      pickupNearestRessource(creep);
      if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        creep.memory.upgrading = true;
      }
    } else {
      mineNextEnergyResource(creep);
    }
  }
  return true;
}

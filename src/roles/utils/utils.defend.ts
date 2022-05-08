import { pickupNearestRessource } from "./utils.carry";
import { randomMoveWhileWithinCriticalInfrastructure } from "./utils.move";

export function defendRanged(creep: Creep) {
  const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (target && creep.store[RESOURCE_ENERGY] > 0) {
    creep.memory.defending = true;
  }
  if (creep.memory.defending) {
    if (creep.store[RESOURCE_ENERGY] == 0) {
      creep.say("Resupply Required!");
      creep.memory.defending = false;
    }
    if (target) {
      const attackResult = creep.rangedAttack(target);
      if (attackResult == ERR_NOT_IN_RANGE) creep.moveTo(target);
    } else if (creep.store.getFreeCapacity(RESOURCE_ENERGY) != 0)creep.memory.defending = false;
    randomMoveWhileWithinCriticalInfrastructure(creep);
  } else {
    if (!pickupNearestRessource(creep)) randomMoveWhileWithinCriticalInfrastructure(creep);
  }
}

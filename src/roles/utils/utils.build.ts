import { pickupNearestRessource } from "./utils.carry";
import { mineNextEnergyResource, minersAlive } from "./utils.mine";

export function buildConstructionSites(creep: Creep) {
  if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.building = false;
  }
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (!creep.memory.building
    && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0
    && targets.length > 0) {
    creep.memory.building = true;
    creep.say("🚧build🚧");
  }

  if (creep.memory.building) {
    if (targets.length > 0) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
      return true;
    }
  } else {
    const droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
    if (minersAlive()) {
      if (!pickupNearestRessource(creep)
        && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        creep.memory.building = true;
      }
    } else {
      mineNextEnergyResource(creep);
    }
  }
  return false;
}

export function buildersAlive(amount = 1): boolean {
  return ((_.filter(Game.creeps, (creep) => creep.memory.role == "builder")).length >= amount);
}


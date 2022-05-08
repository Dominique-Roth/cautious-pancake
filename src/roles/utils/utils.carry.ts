import {getMainSpawn} from "../../utils/RoomUtils";

const CARRY_TARGET_RANGE = 7;

export function pickupNearestRessource(creep: Creep) {
  let droppedSources;
  if (isCarry(creep)) {
    droppedSources = creep.room.find(FIND_DROPPED_RESOURCES, {
      filter: (resource) => {
        return (resource.resourceType === RESOURCE_ENERGY)
          && (resource.pos.getRangeTo((getMainSpawn())) > CARRY_TARGET_RANGE);
      }
    });
  } else if (!carriesAlive()) {
    droppedSources = creep.room.find(FIND_DROPPED_RESOURCES, {
      filter: (resource) => {
        return (resource.resourceType === RESOURCE_ENERGY);
      }
    });
  } else {
    droppedSources = creep.room.find(FIND_DROPPED_RESOURCES, {
      filter: (resource) => {
        return (resource.resourceType === RESOURCE_ENERGY)
          && (resource.pos.getRangeTo((getMainSpawn())) <= CARRY_TARGET_RANGE);
      }
    });
  }
  if (droppedSources.length > 0) {
    let sourceToPickup;
    for (const item of droppedSources) {
      if (item.amount > 250) {
        sourceToPickup = item;
        break;
      }
    }
    if (!sourceToPickup) sourceToPickup = creep.pos.findClosestByPath(droppedSources) as Resource;
    if (creep.pickup(sourceToPickup) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sourceToPickup, {visualizePathStyle: {stroke: "#aaff00"}});
    }
    return true;
  }
  return false;
}

export function carrySupplyToSpawn(creep: Creep) {
  if (creep.store[RESOURCE_ENERGY] == 0) {
    if (!pickupNearestRessource(creep))
      return false;
  } else {
    const target = getMainSpawn();
    if (creep.pos.getRangeTo(target) < CARRY_TARGET_RANGE) {
      creep.say("🏭drop🏭");
      creep.drop(RESOURCE_ENERGY, creep.store[RESOURCE_ENERGY]);
    } else {
      creep.moveTo(target, {visualizePathStyle: {stroke: "#dd00cc"}});
    }
  }
  return true;
}

export function carriesAlive(amount = 1): boolean {
  return _.filter(Game.creeps,
    (creep) =>
      creep.memory.role == "carry.level1"
      || creep.memory.role == "carry.level2"
      || creep.memory.role == "carry.level3")
    .length >= amount;
}

function isCarry(creep: Creep) {
  return creep.memory.role == "carry.level1"
    || creep.memory.role == "carry.level2"
    || creep.memory.role == "carry.level3";
}

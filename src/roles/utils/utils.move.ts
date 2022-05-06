import { getMainController, getMainRoom, getMainSpawn } from "../../utils/RoomUtils";

export function randomMove(creep: Creep) {
  const rnd = parseInt((Math.random() * 9).toFixed(0));
  switch (rnd) {
    case 1:
      creep.move(TOP);
      break;
    case 2:
      creep.move(RIGHT);
      break;
    case 3:
      creep.move(BOTTOM);
      break;
    case 4:
      creep.move(LEFT);
      break;
    case 6:
      creep.move(TOP_RIGHT);
      break;
    case 7:
      creep.move(BOTTOM_RIGHT)
      break;
    case 8:
      creep.move(TOP_LEFT);
      break;
    case 9:
      creep.move(BOTTOM_LEFT)
      break;
  }
}

export function isNotBusy(creep: Creep) {
  return !creep.memory.working
    && !creep.memory.upgrading
    && !creep.memory.building
    && !creep.memory.defending;
}

export function randomMoveWhileWithinCriticalInfrastructure(creep: Creep) {
  if (isNotBusy(creep)
    && (creep.pos.getRangeTo(getMainSpawn().pos) < 5
      || creep.pos.getRangeTo(getMainController().pos) < 5
      || creep.pos.getRangeTo(getMainRoom().find(FIND_SOURCES)[0]) < 5
      || creep.pos.getRangeTo(getMainRoom().find(FIND_SOURCES)[1]) < 5)) {
    randomMove(creep);
    creep.say("😢");
  }
}

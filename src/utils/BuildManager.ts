import {roleBuilder} from "../roles/role.builder";
import {roleCarryLevel1} from "../roles/role.carry.level1";
import {roleCarryLevel2} from "../roles/role.carry.level2";
import {roleMinerLevel2} from "../roles/role.miner.level2";
import {roleMinerLevel1} from "../roles/role.miner.level1";
import {roleSupplier} from "../roles/role.supplier";
import {roleUniversal} from "../roles/role.universal";
import {roleUpgraderLevel1} from "../roles/role.upgrader.level1";
import {roleUpgraderLevel2} from "../roles/role.upgrader.level2";
import {roleDefenderRanged} from "../roles/roles.defender.ranged";
import {carriesAlive} from "../roles/utils/utils.carry";
import {minersAlive} from "../roles/utils/utils.mine";
import {getMainController, getMainRoom, getMainSpawn} from "./RoomUtils";
import {EXTENSIONS_PER_CONTROLLER_LEVEL} from "./utils.rcl";

export function handleCreepCreation() {
  handleCreepBuild();
}

export function handleCreepState() {
  roleUniversal.setBuildState();
  roleMinerLevel2.setBuildState();
  roleMinerLevel1.setBuildState();
  roleCarryLevel2.setBuildState();
  roleCarryLevel1.setBuildState();
  roleSupplier.setBuildState();
  roleBuilder.setBuildState();
  roleUpgraderLevel2.setBuildState();
  roleUpgraderLevel1.setBuildState();
  roleDefenderRanged.setBuildState();
}

function handleCreepBuild() {
  if (getMainSpawn().spawning) return console.log("\n\n\n\nSPAWNING!!!\n\n\n\n");
  console.log("Trying to build: universal");
  if (roleUniversal.handleAutoBuild()) return;
  console.log("Trying to build: miner2");
  if (roleMinerLevel2.handleAutoBuild()) return;
  console.log("Trying to build: miner1");
  if (roleMinerLevel1.handleAutoBuild()) return;
  console.log("Trying to build: supplier");
  if (roleSupplier.handleAutoBuild()) return;
  console.log("Trying to build: carry2");
  if (roleCarryLevel2.handleAutoBuild()) return;
  console.log("Trying to build: carry1");
  if (roleCarryLevel1.handleAutoBuild()) return;
  console.log("Trying to build: builder");
  if (roleBuilder.handleAutoBuild()) return;
  console.log("Trying to build: upgrader2");
  if (roleUpgraderLevel2.handleAutoBuild()) return;
  console.log("Trying to build: upgrader1");
  if (roleUpgraderLevel1.handleAutoBuild()) return;
  console.log("Trying to build: defender.ranged");
  if (roleDefenderRanged.handleAutoBuild()) return;
}

export function handleStructureAutoBuild(room: Room) {
  return buildBase(room);
}

export function handleRoadBuilding(room: Room) {
  if (!(getMainController().level === 3 && Memory.controllerLevelLastTick !== getMainController().level)) return;
  const mainPath = getMainController().pos.findPathTo(Game.spawns.Spawn1.room.find(FIND_SOURCES)[0]);
  if (!mainPath[mainPath.length * 0.5]) return;
  getMainRoom().createFlag(mainPath[mainPath.length * 0.5].x, mainPath[mainPath.length * 0.5].y, "mainFlag");
  const pathSpawnToFlag = Game.spawns.Spawn1.pos.findPathTo(getMainRoom().find(FIND_FLAGS)[0]);
  for (const element of pathSpawnToFlag) {
    getMainRoom().createConstructionSite(element.x, element.y, STRUCTURE_ROAD);
  }
  const pathControllerToFlag = getMainController().pos.findPathTo(getMainRoom().find(FIND_FLAGS)[0]);
  for (const element of pathControllerToFlag) {
    getMainRoom().createConstructionSite(element.x, element.y, STRUCTURE_ROAD);
  }

  const pathRessourceOneToFlag = getMainRoom().find(FIND_FLAGS)[0].pos.findPathTo(getMainRoom().find(FIND_SOURCES)[0]);
  for (let i = 0; i < pathRessourceOneToFlag.length; i++) {
    if (i == pathRessourceOneToFlag.length - 1) break;
    getMainRoom().createConstructionSite(pathRessourceOneToFlag[i].x, pathRessourceOneToFlag[i].y, STRUCTURE_ROAD);
  }

  const pathRessourceTwoToFlag = getMainRoom().find(FIND_FLAGS)[0].pos.findPathTo(getMainRoom().find(FIND_SOURCES)[1]);
  for (let i = 0; i < pathRessourceTwoToFlag.length; i++) {
    if (i == pathRessourceTwoToFlag.length - 1) break;
    getMainRoom().createConstructionSite(pathRessourceTwoToFlag[i].x, pathRessourceTwoToFlag[i].y, STRUCTURE_ROAD);
  }
  Memory.streetsBuilt = true;
  return true;
}

/**
 * Builds the base
 *
 * ToDo: Make running over multiple cycles to not exhaust CPU resources.
 * @param room
 */
export function buildBase(room: Room) {
  if (Memory.baseBuilt) return false;
  Memory.baseBuilt = true;
  if (
    _.filter(Game.structures, structure => structure.structureType == STRUCTURE_EXTENSION).length ==
    EXTENSIONS_PER_CONTROLLER_LEVEL[getMainController().level]
  )
    return false;
  const roomWidth = 50;
  const roomHeight = 50;
  const spawnPosition = getMainSpawn().pos;
  const queue: RoomPosition[] = [];
  queue.push(spawnPosition);
  while (queue.length != 0) {
    const currentPosition = queue.shift();
    if (!currentPosition) continue;
    const currentPositionX = currentPosition.x;
    const currentPositionY = currentPosition.y;

    if (
      currentPositionX < 0 ||
      currentPositionX >= roomWidth ||
      currentPositionY < 0 ||
      currentPositionY >= roomHeight ||
      Math.abs(currentPositionX - spawnPosition.x) > Memory.controllerLevelLastTick ||
      Math.abs(currentPositionY - spawnPosition.y) > Memory.controllerLevelLastTick
    )
      continue;
    const neighbourOne = new RoomPosition(currentPositionX + 1, currentPositionY, currentPosition.roomName);
    const neighbourTwo = new RoomPosition(currentPositionX - 1, currentPositionY, currentPosition.roomName);
    const neighbourThree = new RoomPosition(currentPositionX, currentPositionY + 1, currentPosition.roomName);
    const neighbourFour = new RoomPosition(currentPositionX, currentPositionY - 1, currentPosition.roomName);
    // Add 4 adjacent blocks to queue.
    queue.push(neighbourOne);
    queue.push(neighbourTwo);
    queue.push(neighbourThree);
    queue.push(neighbourFour);
    if (currentPosition.lookFor(LOOK_STRUCTURES).length > 0 || currentPosition.lookFor(LOOK_SOURCES).length > 0)
      // || currentPosition.lookFor(LOOK_TERRAIN).) ToDo Check for wall!
      continue;
    // Place Structures
    if (currentPositionX == spawnPosition.x || currentPositionY == spawnPosition.y) {
      if (getMainController().level >= 3) {
        getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_ROAD);
      }
    } else if (
      (currentPositionX == spawnPosition.x + 1 && currentPosition.y == spawnPosition.y + 1) ||
      (currentPositionX == spawnPosition.x + 1 && currentPosition.y == spawnPosition.y - 1) ||
      (currentPositionX == spawnPosition.x - 1 && currentPosition.y == spawnPosition.y + 1) ||
      (currentPositionX == spawnPosition.x - 1 && currentPosition.y == spawnPosition.y - 1)
    ) {
      getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_TOWER);
    } else if (
      (currentPositionX == spawnPosition.x + 5 && currentPositionY == spawnPosition.y) ||
      (currentPositionX == spawnPosition.x - 5 && currentPositionY == spawnPosition.y) ||
      (currentPositionX == spawnPosition.x && currentPositionY == spawnPosition.y + 5) ||
      (currentPositionX == spawnPosition.x && currentPositionY == spawnPosition.y - 5)
    ) {
      getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_RAMPART);
    } else if (
      currentPositionX == spawnPosition.x + 5 ||
      currentPositionX == spawnPosition.x - 5 ||
      currentPositionY == spawnPosition.y + 5 ||
      currentPositionY == spawnPosition.y - 5
    ) {
      getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_RAMPART);
    } else if (
      neighbourOne.lookFor(LOOK_STRUCTURES).length == 0 &&
      neighbourTwo.lookFor(LOOK_STRUCTURES).length == 0 &&
      neighbourThree.lookFor(LOOK_STRUCTURES).length == 0 &&
      neighbourFour.lookFor(LOOK_STRUCTURES).length == 0
    ) {
      getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_EXTENSION);
    }
  }
  return true;
}

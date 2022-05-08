import {roleBuilderLevel1} from "../roles/builder/role.builder.level1";
import {roleCarryLevel1} from "../roles/carries/role.carry.level1";
import {roleCarryLevel2} from "../roles/carries/role.carry.level2";
import {roleMinerLevel2} from "../roles/miner/role.miner.level2";
import {roleMinerLevel1} from "../roles/miner/role.miner.level1";
import {roleSupplier} from "../roles/supplier/role.supplier";
import {roleUniversal} from "../roles/role.universal";
import {roleUpgraderLevel1} from "../roles/upgrader/role.upgrader.level1";
import {roleUpgraderLevel2} from "../roles/upgrader/role.upgrader.level2";
import {roleDefenderRanged} from "../roles/defender/roles.defender.ranged";
import {carriesAlive} from "../roles/utils/utils.carry";
import {minersAlive} from "../roles/utils/utils.mine";
import {getMainController, getMainRoom, getMainSpawn} from "./RoomUtils";
import {EXTENSIONS_PER_CONTROLLER_LEVEL} from "./utils.rcl";
import {roleUpgraderLevel3} from "../roles/upgrader/role.upgrader.level3";
import {roleBuilderLevel2} from "../roles/builder/role.builder.level2";

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
  roleBuilderLevel2.setBuildState();
  roleBuilderLevel1.setBuildState();
  roleUpgraderLevel3.setBuildState();
  roleUpgraderLevel2.setBuildState();
  roleUpgraderLevel1.setBuildState();
  roleDefenderRanged.setBuildState();
}

function handleCreepBuild() {
  if (getMainSpawn().spawning) return;
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
  console.log("Trying to build: builder2");
  if (roleBuilderLevel2.handleAutoBuild()) return;
  console.log("Trying to build: builder1");
  if (roleBuilderLevel1.handleAutoBuild()) return;
  console.log("Trying to build: upgrader3");
  if (roleUpgraderLevel3.handleAutoBuild()) return;
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
  if (!Memory.pathsBuilt) Memory.pathsBuilt = 0;
  if (Memory.pathsBuilt === 0) {
    const mainPath = getMainController().pos.findPathTo(Game.spawns.Spawn1.room.find(FIND_SOURCES)[0]);
    if (!mainPath[mainPath.length * 0.5]) return;
    getMainRoom().createFlag(mainPath[mainPath.length * 0.5].x, mainPath[mainPath.length * 0.5].y, "mainFlag");
    const pathSpawnToFlag = Game.spawns.Spawn1.pos.findPathTo(getMainRoom().find(FIND_FLAGS)[0]);
    for (const element of pathSpawnToFlag) {
      getMainRoom().createConstructionSite(element.x, element.y, STRUCTURE_ROAD);
    }
    Memory.pathsBuilt = Memory.pathsBuilt + 1;
  } else if (Memory.pathsBuilt === 1) {
    const pathControllerToFlag = getMainController().pos.findPathTo(getMainRoom().find(FIND_FLAGS)[0]);
    for (const element of pathControllerToFlag) {
      getMainRoom().createConstructionSite(element.x, element.y, STRUCTURE_ROAD);
    }
    Memory.pathsBuilt = Memory.pathsBuilt + 1;
  } else if (Memory.pathsBuilt === 2) {
    const pathRessourceOneToFlag = getMainRoom()
      .find(FIND_FLAGS)[0]
      .pos.findPathTo(getMainRoom().find(FIND_SOURCES)[0]);
    for (let i = 0; i < pathRessourceOneToFlag.length; i++) {
      if (i == pathRessourceOneToFlag.length - 1) break;
      getMainRoom().createConstructionSite(pathRessourceOneToFlag[i].x, pathRessourceOneToFlag[i].y, STRUCTURE_ROAD);
    }
    Memory.pathsBuilt = Memory.pathsBuilt + 1;
  } else if (Memory.pathsBuilt === 3) {
    const pathRessourceTwoToFlag = getMainRoom()
      .find(FIND_FLAGS)[0]
      .pos.findPathTo(getMainRoom().find(FIND_SOURCES)[1]);
    for (let i = 0; i < pathRessourceTwoToFlag.length; i++) {
      if (i == pathRessourceTwoToFlag.length - 1) break;
      getMainRoom().createConstructionSite(pathRessourceTwoToFlag[i].x, pathRessourceTwoToFlag[i].y, STRUCTURE_ROAD);
    }
    Memory.pathsBuilt = Memory.pathsBuilt + 1;
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
  const roomWidth = 50;
  const roomHeight = 50;
  const spawnPosition = getMainSpawn().pos;
  if (!Memory.baseBuildQueue) {
    Memory.baseBuildQueue = [];
    Memory.baseBuildQueue.push(spawnPosition);
    Memory.baseBuildStartTick = Game.time;
  }
  if (Memory.baseBuildQueue && Memory.baseBuildQueue.length === 0 || (Memory.baseBuildStartTick < Game.time - 25 && Memory.baseBuildStartTick != 0)) {
    Memory.baseBuildQueue = undefined;
    Memory.baseBuilt = true;
    Memory.baseBuildStartTick = 0;
    return false;
  }
  const terrain = Game.map.getRoomTerrain(getMainRoom().name);
  while (Memory.baseBuildQueue.length > 0) {
    if (Memory.baseBuildQueue.length === 1
      && Memory.baseBuildQueue[0].x !== spawnPosition.x
      && Memory.baseBuildQueue[0].y !== spawnPosition.y)
      return true;
    if (Game.cpu.getUsed() > Game.cpu.tickLimit * 0.1) {
      return true;
    }
    const currentPosition = Memory.baseBuildQueue.shift();
    if (!currentPosition) continue;
    const currentPositionX = currentPosition.x;
    const currentPositionY = currentPosition.y;

    if (
      terrain.get(currentPositionX, currentPositionY) === TERRAIN_MASK_WALL,
      currentPositionX < 0 ||
      currentPositionX >= roomWidth ||
      currentPositionY < 0 ||
      currentPositionY >= roomHeight ||
      Math.abs(currentPositionX - spawnPosition.x) > getMainController().level * 2 ||
      Math.abs(currentPositionY - spawnPosition.y) > getMainController().level * 2
    )
      continue;
    let neighbourOne: RoomPosition;
    let neighbourTwo: RoomPosition;
    let neighbourThree: RoomPosition;
    let neighbourFour: RoomPosition;
    if (currentPositionX + 1 <= 50) {
      neighbourOne = new RoomPosition(currentPositionX + 1, currentPositionY, currentPosition.roomName);
      let pushItem = true;
      for (const item of Memory.baseBuildQueue) {
        if (item.x === neighbourOne.x
          && item.y === neighbourOne.y)
          pushItem = false;
      }
      if (pushItem) {
        Memory.baseBuildQueue.push(neighbourOne);
      }
    }
    if (currentPositionX - 1 > 0) {
      neighbourTwo = new RoomPosition(currentPositionX - 1, currentPositionY, currentPosition.roomName);
      let pushItem = true;
      for (const item of Memory.baseBuildQueue) {
        if (item.x === neighbourTwo.x
          && item.y === neighbourTwo.y)
          pushItem = false;
      }
      if (pushItem) {
        Memory.baseBuildQueue.push(neighbourTwo);
      }
    }
    if (currentPositionY + 1 <= 50) {
      neighbourThree = new RoomPosition(currentPositionX, currentPositionY + 1, currentPosition.roomName);
      let pushItem = true;
      for (const item of Memory.baseBuildQueue) {
        if (item.x === neighbourThree.x
          && item.y === neighbourThree.y)
          pushItem = false;
      }
      if (pushItem) {
        Memory.baseBuildQueue.push(neighbourThree);
      }
    }
    if (currentPositionY - 1 > 0) {
      neighbourFour = new RoomPosition(currentPositionX, currentPositionY - 1, currentPosition.roomName);
      let pushItem = true;
      for (const item of Memory.baseBuildQueue) {
        if (item.x === neighbourFour.x
          && item.y === neighbourFour.y)
          pushItem = false;
      }
      if (pushItem) {
        Memory.baseBuildQueue.push(neighbourFour);
      }
    }

    const shouldIgnoreBuilding =
      new RoomPosition(currentPositionX, currentPositionY, currentPosition.roomName).lookFor(LOOK_STRUCTURES).length >
      0 ||
      new RoomPosition(currentPositionX, currentPositionY, currentPosition.roomName).lookFor(LOOK_SOURCES).length > 0;
    if (shouldIgnoreBuilding)
      // || currentPosition.lookFor(LOOK_TERRAIN).) ToDo Check for wall!
      continue;
    // Place Structures
    let constructionResult;
    if (
      (currentPositionX === spawnPosition.x + 10 && currentPositionY === spawnPosition.y) ||
      (currentPositionX === spawnPosition.x - 10 && currentPositionY === spawnPosition.y) ||
      (currentPositionX === spawnPosition.x && currentPositionY === spawnPosition.y + 10) ||
      (currentPositionX === spawnPosition.x && currentPositionY === spawnPosition.y - 10)
    ) {
      constructionResult = getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_RAMPART);
    } else if (
      currentPositionX === spawnPosition.x + 10 ||
      currentPositionX === spawnPosition.x - 10 ||
      currentPositionY === spawnPosition.y + 10 ||
      currentPositionY === spawnPosition.y - 10
    ) {
      constructionResult = getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_WALL);
    } else if (currentPositionX === spawnPosition.x || currentPositionY === spawnPosition.y) {
      if (getMainController().level >= 3) {
        constructionResult = getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_ROAD);
      }
    } else if (
      (currentPositionX === spawnPosition.x + 1 && currentPosition.y === spawnPosition.y + 1) ||
      (currentPositionX === spawnPosition.x + 1 && currentPosition.y === spawnPosition.y - 1) ||
      (currentPositionX === spawnPosition.x - 1 && currentPosition.y === spawnPosition.y + 1) ||
      (currentPositionX === spawnPosition.x - 1 && currentPosition.y === spawnPosition.y - 1)
    ) {
      constructionResult = getMainRoom().createConstructionSite(currentPositionX, currentPositionY, STRUCTURE_TOWER);
    } else {
      // @ts-ignore
      if (neighbourOne === undefined || neighbourOne.lookFor(LOOK_STRUCTURES).length > 0)
        continue;
      // @ts-ignore
      if (neighbourTwo === undefined || neighbourTwo.lookFor(LOOK_STRUCTURES).length > 0)
        continue;
      // @ts-ignore
      if (neighbourThree === undefined || neighbourThree.lookFor(LOOK_STRUCTURES).length > 0)
        continue;
      // @ts-ignore
      if (neighbourFour === undefined || neighbourFour.lookFor(LOOK_STRUCTURES).length > 0)
        continue;
      constructionResult = getMainRoom().createConstructionSite(
        currentPositionX,
        currentPositionY,
        STRUCTURE_EXTENSION
      );
    }
  }
  Memory.baseBuildQueue = [];
  Memory.baseBuilt = true;
  Memory.baseBuildStartTick = 0;
  return true;
}

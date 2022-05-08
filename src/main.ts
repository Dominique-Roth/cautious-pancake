import { ErrorMapper } from "utils/ErrorMapper";
import { handleTowersLoop } from "./structures/structure.tower";
import {
  handleCreepCreation,
  handleCreepState,
  handleRoadBuilding,
  handleStructureAutoBuild
} from "./utils/BuildManager";
import { getMainController, getMainRoom } from "./utils/RoomUtils";
import { creepLoop, handleGameState } from "./utils/StateManager";

console.log("###\nDoms Screeps Colony\n###");


declare global {
  // Available game states to adjust behavior to, currently based on the controllerLevel.
  // enum of colony goals
  const enum colonyGoals {
    controllerLevel2,
    controllerLevel3,
    controllerLevel4,
    controllerLevel5,
    controllerLevel6,
    controllerLevel7,
    controllerLevel8
  }


  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */

  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
    currentColonyGoal: colonyGoals,
    baseBuilt: boolean,
    towersBuilt: boolean,
    streetsBuilt: boolean,
    controllerLevelLastTick: number,
    pathsBuilt: number,
    baseBuildQueue: RoomPosition[]|undefined,
    baseBuildStartTick: number,
    minersPreviouslyActive: boolean,

    // Max Creep Role Amounts
    maxUniversalCreepsAmount: number,
    maxMinerLevel1CreepsAmount: number,
    maxMinerLevel2CreepsAmount: number,
    maxCarryLevel1CreepsAmount: number,
    maxCarryLevel2CreepsAmount: number,
    maxCarryLevel3CreepsAmount: number,
    maxBuilderLevel1CreepsAmount: number,
    maxBuilderLevel2CreepsAmount: number,
    maxRangedDefenderCreepsAmount: number,
    maxUpgraderLevel1CreepsAmount: number,
    maxUpgraderLevel2CreepsAmount: number,
    maxUpgraderLevel3CreepsAmount: number,
    maxSupplierCreepsAmount: number
  }

  interface CreepMemory {
    role: string,
    room?: string,
    working?: boolean,
    upgrading?: boolean,
    building?: boolean,
    defending?: boolean,
    carryTargetSource?: Source,
    harvestTarget?: Id<Source>,
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`\n\nDebug Messages:\n\n[STATE TRACKER]Current game tick is ${Game.time}`);
  const currentControllerLevel = getMainController().level;
  if (!Memory.controllerLevelLastTick
    || (Memory.controllerLevelLastTick
      && currentControllerLevel != Memory.controllerLevelLastTick)) {
    Memory.baseBuildQueue = undefined;
    Memory.baseBuilt = false;
    Memory.controllerLevelLastTick = currentControllerLevel;
  }

  if (handleStructureAutoBuild(getMainRoom()))
    return;
  if (handleRoadBuilding(getMainRoom()))
    return;
  handleGameState();

  handleCreepState();

  handleSpawnerInfoText();
  handleCreepCreation();
  handleTowersLoop();
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
    creepLoop(name);
  }
});

function handleSpawnerInfoText() {
  if (Game.spawns["Spawn1"].spawning) {
    const spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
    Game.spawns["Spawn1"].room.visual.text(
      `🔨 ${spawningCreep.memory.role} 🔨`,
      Game.spawns["Spawn1"].pos.x + 1,
      Game.spawns["Spawn1"].pos.y,
      { align: "left", opacity: 0.8 });
  }
}

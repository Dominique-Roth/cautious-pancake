import {getMainRoom} from "utils/RoomUtils";
import {buildConstructionSites} from "../utils/utils.build";
import {randomMoveWhileWithinCriticalInfrastructure} from "../utils/utils.move";
import {buildCreep} from "../utils/utils.spawn";

export namespace roleBuilderLevel3 {
  export const roleName = "builder.level3";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case colonyGoals.controllerLevel5:
        Memory.maxBuilderLevel3CreepsAmount = 4;
        break;
      case colonyGoals.controllerLevel6:
        Memory.maxBuilderLevel3CreepsAmount = 4;
        break;
      default:
        Memory.maxBuilderLevel3CreepsAmount = 3;
        break;
    }
  }

  export function handleAutoBuild() {
    const constructionSites = getMainRoom().find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length === 0) return false;
    const builder = _.filter(Game.creeps, creep => creep.memory.role === roleName);
    if (builder.length < Memory.maxBuilderLevel3CreepsAmount) {
      return build();
    }
    return false;
  }

  /** start */
  export function build() {
    buildCreep(roleName, [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]);
  }

  export function run(creep: Creep) {
    if (buildConstructionSites(creep)) return;
    randomMoveWhileWithinCriticalInfrastructure(creep);
  }
}

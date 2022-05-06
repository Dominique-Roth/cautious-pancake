import { getMainRoom } from "utils/RoomUtils";
import { buildConstructionSites } from "./utils/utils.build";
import { randomMoveWhileWithinCriticalInfrastructure } from "./utils/utils.move";
import { buildCreep } from "./utils/utils.spawn";
import { upgradeControllerDirectly } from "./utils/utils.upgrade";

export namespace roleBuilder {
  export const roleName = "builder.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2):
        Memory.maxBuilderCreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel3):
        Memory.maxBuilderCreepsAmount = 2;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxBuilderCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxBuilderCreepsAmount = 4;
        break;
      default:
        Memory.maxBuilderCreepsAmount = 3;
        break;
    }
  }

  export function handleAutoBuild() {
    const constructionSites = getMainRoom().find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length == 0)
      return false;
    const builder = _.filter(Game.creeps,
      (creep) => creep.memory.role == "builder");
    if (builder.length < Memory.maxBuilderCreepsAmount) {
      return build();
    }
    return false;
  }

  /** start */
  export function build() {
    buildCreep(
      "builder",
      [MOVE, MOVE, WORK, CARRY]
    );
  }

  export function run(creep: Creep) {
    if (buildConstructionSites(creep)) {
      return;
    }
    if (upgradeControllerDirectly(creep)) return;
    randomMoveWhileWithinCriticalInfrastructure(creep);
  }
}

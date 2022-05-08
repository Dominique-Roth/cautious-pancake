import { getMainRoom } from "utils/RoomUtils";
import { buildConstructionSites } from "../utils/utils.build";
import { randomMoveWhileWithinCriticalInfrastructure } from "../utils/utils.move";
import { buildCreep } from "../utils/utils.spawn";
import { upgradeControllerDirectly } from "../utils/utils.upgrade";

export namespace roleHealerLevel1 {
  export const roleName = "healer.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2):
        Memory.maxBuilderLevel1CreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel3):
        Memory.maxBuilderLevel1CreepsAmount = 2;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxBuilderLevel1CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxBuilderLevel1CreepsAmount = 4;
        break;
      default:
        Memory.maxBuilderLevel1CreepsAmount = 3;
        break;
    }
  }

  export function handleAutoBuild() {
    const constructionSites = getMainRoom().find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length == 0)
      return false;
    const builder = _.filter(Game.creeps,(creep) => creep.memory.role == roleName);
    if (builder.length < Memory.maxBuilderLevel1CreepsAmount) {
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

import { buildConstructionSites } from "./utils/utils.build";
import { buildCreep } from "./utils/utils.spawn";
import { randomMoveWhileWithinCriticalInfrastructure } from "./utils/utils.move";
import { resupplyStructures } from "./utils/utils.resupply";
import { upgradeControllerDirectly } from "./utils/utils.upgrade";

export namespace roleUniversal {
  export const roleName = "universal";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2):
        Memory.maxUniversalCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel3):
        Memory.maxUniversalCreepsAmount = 2;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxUniversalCreepsAmount = 2;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxUniversalCreepsAmount = 2;
        break;
      default:
        Memory.maxUniversalCreepsAmount = 2;
        break;
    }
  }

  export function handleAutoBuild() {
    const universals = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (universals.length < Memory.maxUniversalCreepsAmount) {
      return build();
    }
    return false;
  }

  /** start
   */
  export function build() {
    return buildCreep(
      roleName,
      [WORK, CARRY, MOVE, MOVE]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep) {
    if ((<StructureController>creep.room.controller).ticksToDowngrade < 1000) {
      console.log("Controller about to downgrade!");
      upgradeControllerDirectly(creep);
      return;
    }
    switch (Memory.currentColonyGoal) {
      case colonyGoals.controllerLevel2:
        handleStateControllerLevel1(creep);
        break;
      case colonyGoals.controllerLevel3:
        handleStateControllerLevel2(creep);
        break;
      default:
        handleStateControllerLevel2(creep);
        break;
    }
  }

  function handleStateControllerLevel1(creep: Creep) {
    /*
    1. Upgrade Controller to lvl 2.
    2.
     */
    upgradeControllerDirectly(creep);
  }

  function handleStateControllerLevel2(creep: Creep) {
    if (resupplyStructures(creep))
      return;
    if (upgradeControllerDirectly(creep))
      return;
    if (buildConstructionSites(creep))
      return;
    randomMoveWhileWithinCriticalInfrastructure(creep);
  }
}

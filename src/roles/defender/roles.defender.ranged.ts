import { defendRanged } from "../utils/utils.defend";
import { buildCreep } from "../utils/utils.spawn";
import { pickupNearestRessource } from "../utils/utils.carry";
import { randomMoveWhileWithinCriticalInfrastructure } from "../utils/utils.move";
import { upgradeControllerDirectly } from "../utils/utils.upgrade";

export namespace roleDefenderRanged {

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel4):
        Memory.maxRangedDefenderCreepsAmount = 3;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxRangedDefenderCreepsAmount = 5;
        break;
      case (colonyGoals.controllerLevel6):
        Memory.maxRangedDefenderCreepsAmount = 5;
        break;
      case (colonyGoals.controllerLevel7):
        Memory.maxRangedDefenderCreepsAmount = 5;
        break;
      case (colonyGoals.controllerLevel8):
        Memory.maxRangedDefenderCreepsAmount = 5;
        break;
      default:
        Memory.maxRangedDefenderCreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const universals = _.filter(Game.creeps,
      (creep) => creep.memory.role == "defender.ranged");
    if (universals.length < Memory.maxRangedDefenderCreepsAmount) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Carry, 5 Move, Work
    return buildCreep(
      "defender.ranged",
      [MOVE,MOVE,CARRY,CARRY,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep) {
    if ((<StructureController>creep.room.controller).ticksToDowngrade < 1000) {
      console.log("Controller about to downgrade!");
      return upgradeControllerDirectly(creep);
    }
    return defendRanged(creep);
  }
}

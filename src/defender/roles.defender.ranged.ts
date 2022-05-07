import { defend } from "../roles/utils/utils.defend";
import { buildCreep } from "../roles/utils/utils.spawn";
import { pickupNearestRessource } from "../roles/utils/utils.carry";
import { randomMoveWhileWithinCriticalInfrastructure } from "../roles/utils/utils.move";
import { upgradeControllerDirectly } from "../roles/utils/utils.upgrade";

export namespace roleDefenderRanged {

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel3):
        Memory.maxRangedDefenderCreepsAmount = 3;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxRangedDefenderCreepsAmount = 4;
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
      [
        ATTACK, ATTACK, ATTACK, ATTACK,
        CARRY, CARRY,
        MOVE
      ]
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
    return defend(creep);
  }
}

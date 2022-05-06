import { defend } from "./utils/utils.defend";
import { buildCreep } from "./utils/utils.spawn";
import { pickupNearestRessource } from "./utils/utils.carry";
import { randomMoveWhileWithinCriticalInfrastructure } from "./utils/utils.move";
import { upgradeControllerDirectly } from "./utils/utils.upgrade";

export namespace roleDefenderRanged {

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel3):
        global.maxRangedDefenderCreepsAmount = 3;
        break;
      case (colonyGoals.controllerLevel4):
        global.maxRangedDefenderCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        global.maxRangedDefenderCreepsAmount = 5;
        break;
      case (colonyGoals.controllerLevel6):
        global.maxRangedDefenderCreepsAmount = 5;
        break;
      case (colonyGoals.controllerLevel7):
        global.maxRangedDefenderCreepsAmount = 5;
        break;
      case (colonyGoals.controllerLevel8):
        global.maxRangedDefenderCreepsAmount = 5;
        break;
      default:
        global.maxRangedDefenderCreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const universals = _.filter(Game.creeps,
      (creep) => creep.memory.role == "defender.ranged");
    if (universals.length < global.maxRangedDefenderCreepsAmount) {
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

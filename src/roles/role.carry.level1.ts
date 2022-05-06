import { minersAlive } from "./utils/utils.mine";
import { buildCreep } from "./utils/utils.spawn";
import { carrySupplyToSpawn } from "./utils/utils.carry";

export namespace roleCarryLevel1 {
  export const roleName = "carry.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2):
        global.maxCarryLevelOneCreepsAmount = 1;
        break;
      case (colonyGoals.controllerLevel3):
        global.maxCarryLevelOneCreepsAmount = 3;
        break;
      case (colonyGoals.controllerLevel4):
        global.maxCarryLevelOneCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        global.maxCarryLevelOneCreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel6):
        global.maxCarryLevelOneCreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel7):
        global.maxCarryLevelOneCreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel8):
        global.maxCarryLevelOneCreepsAmount = 0;
        break;
      default:
        global.maxCarryLevelOneCreepsAmount = 3;
        break;
    }
  }

  export function handleAutoBuild() {
    const carries = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (carries.length < global.maxCarryLevelOneCreepsAmount && minersAlive()) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Carry, 5 Move, Work
    return buildCreep(
      roleName,
      [
        CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE
      ]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep) {
    carrySupplyToSpawn(creep);
  }
}

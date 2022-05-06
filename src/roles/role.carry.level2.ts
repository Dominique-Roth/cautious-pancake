import { carrySupplyToSpawn } from "./utils/utils.carry";
import { minersAlive } from "./utils/utils.mine";
import { buildCreep } from "./utils/utils.spawn";

export namespace roleCarryLevel2 {
  export const roleName = "carry.level2";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel5):
        Memory.maxCarryLevelTwoCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel6):
        Memory.maxCarryLevelTwoCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel7):
        Memory.maxCarryLevelTwoCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel8):
        Memory.maxCarryLevelTwoCreepsAmount = 4;
        break;
      default:
        Memory.maxCarryLevelTwoCreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const carries = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (carries.length < Memory.maxCarryLevelTwoCreepsAmount && minersAlive()) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Carry, 5 Move, Work
    return buildCreep(
      roleName,
      [
        CARRY, CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE, MOVE
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

import { carrySupplyToSpawn } from "../utils/utils.carry";
import { minersAlive } from "../utils/utils.mine";
import { buildCreep } from "../utils/utils.spawn";

export namespace roleCarryLevel3 {
  export const roleName = "carry.level3";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case colonyGoals.controllerLevel6:
        Memory.maxCarryLevel3CreepsAmount = 4;
        break;
      case colonyGoals.controllerLevel7:
        Memory.maxCarryLevel3CreepsAmount = 4;
        break;
      case colonyGoals.controllerLevel8:
        Memory.maxCarryLevel3CreepsAmount = 4;
        break;
      default:
        Memory.maxCarryLevel3CreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const carries = _.filter(Game.creeps, creep => creep.memory.role == roleName);
    if (carries.length < Memory.maxCarryLevel3CreepsAmount && minersAlive()) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Carry, 5 Move, Work
    return buildCreep(roleName, [
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY
    ]);
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep) {
    carrySupplyToSpawn(creep);
  }
}

import { minersAlive } from "../utils/utils.mine";
import { buildCreep } from "../utils/utils.spawn";
import { carrySupplyToSpawn } from "../utils/utils.carry";
import {roleCarryLevel2} from "./role.carry.level2";

export namespace roleCarryLevel1 {
  export const roleName = "carry.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2):
        Memory.maxCarryLevel1CreepsAmount = 1;
        break;
      case (colonyGoals.controllerLevel3):
        Memory.maxCarryLevel1CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel4):
        if (_.filter(Game.creeps, creep => creep.memory.role === roleCarryLevel2.roleName).length > 1)
        Memory.maxCarryLevel1CreepsAmount = 1;
        else Memory.maxCarryLevel1CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxCarryLevel1CreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel6):
        Memory.maxCarryLevel1CreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel7):
        Memory.maxCarryLevel1CreepsAmount = 0;
        break;
      case (colonyGoals.controllerLevel8):
        Memory.maxCarryLevel1CreepsAmount = 0;
        break;
      default:
        Memory.maxCarryLevel1CreepsAmount = 4;
        break;
    }
  }

  export function handleAutoBuild() {
    const carries = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (carries.length < Memory.maxCarryLevel1CreepsAmount && minersAlive()) {
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

import { buildCreep } from "../utils/utils.spawn";
import { mineNextEnergyResource } from "../utils/utils.mine";

export namespace roleMinerLevel2 {
  export const roleName = "miner.level2";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel3):
        Memory.maxMinerLevel2CreepsAmount = 3;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxMinerLevel2CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxMinerLevel2CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel6):
        Memory.maxMinerLevel2CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel7):
        Memory.maxMinerLevel2CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel8):
        Memory.maxMinerLevel2CreepsAmount = 4;
        break;
      default:
        Memory.maxMinerLevel2CreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const miners = _.filter(Game.creeps,
      (creep) => creep.memory.role === roleName);
    if (miners.length < Memory.maxMinerLevel2CreepsAmount) {
      return build();
    }
    return false;
  }

  /** start
   */
  export function build() {
    return buildCreep(
      roleName,
      [WORK, WORK, WORK, WORK, WORK, MOVE]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep:Creep) {
    mineNextEnergyResource(creep);
  }
}

import { buildCreep } from "../utils/utils.spawn";
import { mineNextEnergyResource } from "../utils/utils.mine";

export namespace roleMinerLevel3 {
  export const roleName = "miner.level3";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel5):
        Memory.maxMinerLevel3CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel6):
        Memory.maxMinerLevel3CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel7):
        Memory.maxMinerLevel3CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel8):
        Memory.maxMinerLevel3CreepsAmount = 4;
        break;
      default:
        Memory.maxMinerLevel3CreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const miners = _.filter(Game.creeps,
      (creep) => creep.memory.role === roleName);
    if (miners.length < Memory.maxMinerLevel3CreepsAmount) {
      return build();
    }
    return false;
  }

  /** start
   */
  export function build() {
    return buildCreep(
      roleName,
      [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep:Creep) {
    mineNextEnergyResource(creep);
  }
}

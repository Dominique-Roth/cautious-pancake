import { buildCreep } from "../utils/utils.spawn";
import { mineNextEnergyResource } from "../utils/utils.mine";

export namespace roleMinerLevel2 {
  export const roleName = "miner.level2";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel3):
        Memory.maxMinerMediumCreepsAmount = 2;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxMinerMediumCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxMinerMediumCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel6):
        Memory.maxMinerMediumCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel7):
        Memory.maxMinerMediumCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel8):
        Memory.maxMinerMediumCreepsAmount = 4;
        break;
      default:
        Memory.maxMinerMediumCreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild() {
    const miners = _.filter(Game.creeps,
      (creep) => creep.memory.role === roleName);
    if (miners.length < Memory.maxMinerMediumCreepsAmount) {
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
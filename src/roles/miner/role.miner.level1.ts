import { mineNextEnergyResource, minersAlive } from "../utils/utils.mine";
import { buildCreep } from "../utils/utils.spawn";

export namespace roleMinerLevel1 {
  export const roleName = "miner.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2): {
        Memory.maxMinerSmallCreepsAmount = 2;
        break;
      }
      case (colonyGoals.controllerLevel3):
        Memory.maxMinerSmallCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel5:
        Memory.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel6:
        Memory.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel7:
        Memory.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel8:
        Memory.maxMinerSmallCreepsAmount = 0;
        break;
      default:
        Memory.maxMinerSmallCreepsAmount = 6;
        break;
    }
  }

  export function handleAutoBuild() {
    if (!minersAlive(3))
      return build();
    const miners = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (miners.length < Memory.maxMinerSmallCreepsAmount) {
      return build();
    }
    return false;
  }

  /** start
   */
  export function build() {
    return buildCreep(
      roleName,
      [WORK, WORK, WORK, MOVE]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep:Creep) {
    mineNextEnergyResource(creep);
  }
}

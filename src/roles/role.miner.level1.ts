import { mineNextEnergyResource, minersAlive } from "./utils/utils.mine";
import { buildCreep } from "./utils/utils.spawn";

export namespace roleMinerLevel1 {
  export const roleName = "miner.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2): {
        global.maxMinerSmallCreepsAmount = 2;
        break;
      }
      case (colonyGoals.controllerLevel3):
        global.maxMinerSmallCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel4):
        global.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel5:
        global.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel6:
        global.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel7:
        global.maxMinerSmallCreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel8:
        global.maxMinerSmallCreepsAmount = 0;
        break;
      default:
        global.maxMinerSmallCreepsAmount = 6;
        break;
    }
  }

  export function handleAutoBuild() {
    if (!minersAlive(3))
      return build();
    const miners = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (miners.length < global.maxMinerSmallCreepsAmount) {
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

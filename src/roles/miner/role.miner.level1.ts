import { mineNextEnergyResource, minersAlive } from "../utils/utils.mine";
import { buildCreep } from "../utils/utils.spawn";

export namespace roleMinerLevel1 {
  export const roleName = "miner.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2): {
        Memory.maxMinerLevel1CreepsAmount = 2;
        break;
      }
      case (colonyGoals.controllerLevel3):
        Memory.maxMinerLevel1CreepsAmount = 1;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxMinerLevel1CreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel5:
        Memory.maxMinerLevel1CreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel6:
        Memory.maxMinerLevel1CreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel7:
        Memory.maxMinerLevel1CreepsAmount = 0;
        break;
      case colonyGoals.controllerLevel8:
        Memory.maxMinerLevel1CreepsAmount = 0;
        break;
      default:
        Memory.maxMinerLevel1CreepsAmount = 6;
        break;
    }
  }

  export function handleAutoBuild() {
    if (!minersAlive(3))
      return build();
    const miners = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (miners.length < Memory.maxMinerLevel1CreepsAmount) {
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

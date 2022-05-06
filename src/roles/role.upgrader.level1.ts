import {buildCreep} from "./utils/utils.spawn";
import {upgradeControllerDirectly} from "./utils/utils.upgrade";

export namespace roleUpgraderLevel1 {
  export const roleName = "upgrader.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel3):
        Memory.maxUpgraderLevel1CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxUpgraderLevel1CreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxUpgraderLevel1CreepsAmount = 0;
        break;
      default:
        Memory.maxUpgraderLevel1CreepsAmount = 5;
        break;
    }
  }

  export function handleAutoBuild() {
    const universals = _.filter(Game.creeps, creep => creep.memory.role === roleName);
    if (universals.length < Memory.maxUpgraderLevel1CreepsAmount) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Carry, 5 Move, Work

    return buildCreep(
      roleName,
      [
        CARRY, CARRY, CARRY,
        MOVE, MOVE,
        WORK
      ]
    );
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep) {
    upgradeControllerDirectly(creep);
  }
}

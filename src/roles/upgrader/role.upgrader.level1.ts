import {buildCreep} from "../utils/utils.spawn";
import {upgradeControllerDirectly} from "../utils/utils.upgrade";
import {buildersAlive} from "../utils/utils.build";

export namespace roleUpgraderLevel1 {
  export const roleName = "upgrader.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel3):
        if (buildersAlive()) Memory.maxUpgraderLevel1CreepsAmount = 2;
        else Memory.maxUpgraderLevel1CreepsAmount = 8;
        break;
      default:
        Memory.maxUpgraderLevel1CreepsAmount = 1;
        break;
    }
  }

  export function handleAutoBuild() {
    const upgrader = _.filter(Game.creeps, creep => creep.memory.role === roleName);
    if (upgrader.length < Memory.maxUpgraderLevel1CreepsAmount) {
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

import { buildCreep } from "./utils/utils.spawn";
import { upgradeControllerDirectly } from "./utils/utils.upgrade";

export namespace roleUpgraderLevel2 {
  export const roleName = "upgrader.level2";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel4):
        global.maxUpgraderLevel2CreepsAmount = 6;
        break;
      case (colonyGoals.controllerLevel5):
        global.maxUpgraderLevel2CreepsAmount = 6;
        break;
      default:
        global.maxUpgraderLevel2CreepsAmount = 10;
        break;
    }
  }

  export function handleAutoBuild() {
    const universals = _.filter(Game.creeps,
      (creep) => creep.memory.role == roleName);
    if (universals.length < global.maxUpgraderLevel2CreepsAmount) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Carry, 5 Move, Work
    return buildCreep(
      roleName,
      [
        CARRY, CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE,
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

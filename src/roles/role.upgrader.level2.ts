import {buildCreep} from "./utils/utils.spawn";
import {upgradeControllerDirectly} from "./utils/utils.upgrade";

export namespace roleUpgraderLevel2 {
  export const roleName = "upgrader.level2";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case colonyGoals.controllerLevel4:
        Memory.maxUpgraderLevel2CreepsAmount = 10;
        break;
      case colonyGoals.controllerLevel5:
        Memory.maxUpgraderLevel2CreepsAmount = 6;
        break;
      default:
        Memory.maxUpgraderLevel2CreepsAmount = 10;
        break;
    }
  }

  export function handleAutoBuild(): boolean {
    const universals = _.filter(Game.creeps, creep => creep.memory.role === roleName);
    if (universals.length < Memory.maxUpgraderLevel2CreepsAmount) {
      return build();
    }
    return false;
  }

  export function build(): boolean {
    // 4 Carry, 5 Move, Work
    return buildCreep(roleName, [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK]);
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep): boolean {
    return upgradeControllerDirectly(creep);
  }
}

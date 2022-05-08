import { buildCreep } from "../utils/utils.spawn";
import { upgradeControllerDirectly } from "../utils/utils.upgrade";
import { buildersAlive } from "../utils/utils.build";

export namespace roleUpgraderLevel2 {
  export const roleName = "upgrader.level2";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case colonyGoals.controllerLevel4:
        if (buildersAlive()) Memory.maxUpgraderLevel2CreepsAmount = 2;
        else Memory.maxUpgraderLevel2CreepsAmount = 6;
        break;
      case colonyGoals.controllerLevel5:
        Memory.maxUpgraderLevel2CreepsAmount = 2;
        break;
      default:
        Memory.maxUpgraderLevel2CreepsAmount = 0;
        break;
    }
  }

  export function handleAutoBuild(): boolean {
    const upgrader = _.filter(Game.creeps, creep => creep.memory.role === roleName);
    if (upgrader.length < Memory.maxUpgraderLevel2CreepsAmount) {
      return build();
    }
    return false;
  }

  export function build(): boolean {
    // 4 Carry, 5 Move, Work
    return buildCreep(roleName, [MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]);
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep): boolean {
    return upgradeControllerDirectly(creep);
  }
}

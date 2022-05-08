import {buildCreep} from "../utils/utils.spawn";
import {upgradeControllerDirectly} from "../utils/utils.upgrade";
import {buildersAlive} from "../utils/utils.build";

export namespace roleUpgraderLevel3 {
  export const roleName = "upgrader.level3";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case colonyGoals.controllerLevel5:
        if (buildersAlive()) Memory.maxUpgraderLevel3CreepsAmount = 2;
        else Memory.maxUpgraderLevel3CreepsAmount = 10;
        break;
      case colonyGoals.controllerLevel6:
        if (buildersAlive()) Memory.maxUpgraderLevel2CreepsAmount = 2;
        else Memory.maxUpgraderLevel3CreepsAmount = 10;
        break;
      case colonyGoals.controllerLevel7:
        if (buildersAlive()) Memory.maxUpgraderLevel2CreepsAmount = 2;
        else Memory.maxUpgraderLevel3CreepsAmount = 10;
        break;
      case colonyGoals.controllerLevel8:
        if (buildersAlive()) Memory.maxUpgraderLevel2CreepsAmount = 2;
        else Memory.maxUpgraderLevel3CreepsAmount = 10;
        break;
      default:
        Memory.maxUpgraderLevel3CreepsAmount = 2;
        break;
    }
  }

  export function handleAutoBuild(): boolean {
    const universals = _.filter(Game.creeps, creep => creep.memory.role === roleName);
    if (universals.length < Memory.maxUpgraderLevel3CreepsAmount) {
      return build();
    }
    return false;
  }

  export function build(): boolean {
    // 4 Carry, 5 Move, Work
    return buildCreep(roleName, [
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY
    ]);
  }

  /** run
   * @param {Creep} creep
   */
  export function run(creep: Creep): boolean {
    return upgradeControllerDirectly(creep);
  }
}

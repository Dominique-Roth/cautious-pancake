import { randomMoveWhileWithinCriticalInfrastructure } from "../utils/utils.move";
import { resupplyStructures } from "../utils/utils.resupply";
import { buildCreep } from "../utils/utils.spawn";
import { upgradeControllerDirectly } from "../utils/utils.upgrade";

export namespace roleSupplier {
  export const roleName = "supplier.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      case (colonyGoals.controllerLevel2):
        Memory.maxSupplierCreepsAmount = 1;
        break;
      case (colonyGoals.controllerLevel3):
        Memory.maxSupplierCreepsAmount = 2;
        break;
      case (colonyGoals.controllerLevel4):
        Memory.maxSupplierCreepsAmount = 4;
        break;
      case (colonyGoals.controllerLevel5):
        Memory.maxSupplierCreepsAmount = 4;
        break;
      default:
        Memory.maxSupplierCreepsAmount = 4;
        break;
    }
  }

  export function handleAutoBuild() {
    const supplier = _.filter(Game.creeps,(creep) => creep.memory.role === "supplier");
    if (supplier.length < Memory.maxSupplierCreepsAmount) {
      return build();
    }
    return false;
  }

  export function build() {
    // 4 Supplier, 5 Move, Work
    return buildCreep(
      "supplier",
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
    if ((<StructureController>creep.room.controller).ticksToDowngrade < 1000) {
      console.log("Controller about to downgrade!");
      return upgradeControllerDirectly(creep);
    }
    return resupplyStructures(creep)
  }
}

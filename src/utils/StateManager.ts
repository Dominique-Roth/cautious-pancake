import { roleBuilderLevel1 } from "../roles/builder/role.builder.level1";
import { roleCarryLevel1 } from "../roles/carries/role.carry.level1";
import { roleCarryLevel2 } from "../roles/carries/role.carry.level2";
import { roleMinerLevel2 } from "../roles/miner/role.miner.level2";
import { roleMinerLevel1 } from "../roles/miner/role.miner.level1";
import { roleSupplier } from "../roles/supplier/role.supplier";
import { roleUniversal } from "../roles/role.universal";
import { roleUpgraderLevel1 } from "../roles/upgrader/role.upgrader.level1";
import { roleUpgraderLevel2 } from "../roles/upgrader/role.upgrader.level2";
import { roleDefenderRanged } from "../roles/defender/roles.defender.ranged";
import { getMainController, getMainRoom } from "./RoomUtils";
import {roleBuilderLevel2} from "../roles/builder/role.builder.level2";
import {roleUpgraderLevel3} from "../roles/upgrader/role.upgrader.level3";


export function handleGameState() {
  console.log(`[Colony Goal] ${Memory.currentColonyGoal}`);
  console.log(`[Controller LvL] ${getMainController().level}`);
  // First task is to upgrade to lvl 2
  switch (getMainController().level) {
    case 1:
      Memory.currentColonyGoal = colonyGoals.controllerLevel2;
      break;
    case 2:
      Memory.currentColonyGoal = colonyGoals.controllerLevel3;
      break;
    case 3:
      Memory.currentColonyGoal = colonyGoals.controllerLevel4;
      break;
    case 4:
      Memory.currentColonyGoal = colonyGoals.controllerLevel5;
      break;
    case 5:
      Memory.currentColonyGoal = colonyGoals.controllerLevel6;
      break;
    case 6:
      Memory.currentColonyGoal = colonyGoals.controllerLevel7;
      break;
    case 7:
      Memory.currentColonyGoal = colonyGoals.controllerLevel8;
      break;
    case 8:
      Memory.currentColonyGoal = colonyGoals.controllerLevel8;
      break;
    default: throw new Error("No Colony Goal Detected!");
  }
}

export function creepLoop(name: string) {
  const creep = Game.creeps[name];
  if (!Game.creeps[name])
    return;
  if (<number>Game.creeps[name].ticksToLive < 3) {
    if (Game.creeps[name].store[RESOURCE_ENERGY] > 0) Game.creeps[name].drop(RESOURCE_ENERGY);
    else { Game.creeps[name].suicide(); return; }
  }
  switch (Game.creeps[name].memory.role) {
    case roleUniversal.roleName:
      roleUniversal.run(creep);
      break;
    case roleUpgraderLevel3.roleName:
      roleUpgraderLevel3.run(creep);
      break;
    case roleUpgraderLevel2.roleName:
      roleUpgraderLevel2.run(creep);
      break;
    case roleUpgraderLevel1.roleName:
      roleUpgraderLevel1.run(creep);
      break;
    case roleBuilderLevel1.roleName:
      roleBuilderLevel1.run(creep);
      break;
    case roleBuilderLevel2.roleName:
      roleBuilderLevel2.run(creep);
      break;
    case roleCarryLevel1.roleName:
      roleCarryLevel1.run(creep);
      break;
    case roleCarryLevel2.roleName:
      roleCarryLevel2.run(creep);
      break;
    case roleMinerLevel2.roleName:
      roleMinerLevel2.run(creep);
      break;
    case roleMinerLevel1.roleName:
      roleMinerLevel1.run(creep);
      break;
    case "defender.ranged":
      roleDefenderRanged.run(creep);
      break;
    case "supplier":
      roleSupplier.run(creep);
      break;
    default:
      creep.say("!NO ROLE!");
      break;
  }
}

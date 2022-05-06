import { roleBuilder } from "../roles/role.builder";
import { roleCarryLevel1 } from "../roles/role.carry.level1";
import { roleCarryLevel2 } from "../roles/role.carry.level2";
import { roleMinerLevel2 } from "../roles/role.miner.level2";
import { roleMinerLevel1 } from "../roles/role.miner.level1";
import { roleSupplier } from "../roles/role.supplier";
import { roleUniversal } from "../roles/role.universal";
import { roleUpgraderLevel1 } from "../roles/role.upgrader.level1";
import { roleUpgraderLevel2 } from "../roles/role.upgrader.level2";
import { roleDefenderRanged } from "../roles/roles.defender.ranged";
import { getMainController, getMainRoom } from "./RoomUtils";


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
  switch (Game.creeps[name].memory.role) {
    case roleUniversal.roleName:
      roleUniversal.run(creep);
      break;
    case roleUpgraderLevel2.roleName:
      roleUpgraderLevel2.run(creep);
      break;
    case roleUpgraderLevel1.roleName:
      roleUpgraderLevel1.run(creep);
      break;
    case "builder":
      roleBuilder.run(creep);
      break;
    case roleCarryLevel1.roleName:
      roleCarryLevel1.run(creep);
      break;
    case roleCarryLevel2.roleName:
      roleCarryLevel2.run(creep);
      break;
    case "miner.level1":
      roleMinerLevel2.run(creep);
      break;
    case "miner.level2":
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

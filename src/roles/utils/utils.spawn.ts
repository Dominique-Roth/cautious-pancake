import {Config, names, uniqueNamesGenerator} from "unique-names-generator";
import {getMainSpawn} from "../../utils/RoomUtils";
import {roleUniversal} from "../role.universal";
import {roleUpgraderLevel1} from "../upgrader/role.upgrader.level1";

export function buildCreep(
  creepRole: string,
  bodyParts: BodyPartConstant[]
) {
  const creepList = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);
  console.log(`[Creep Amount] ${creepRole}: ${creepList.length}`);

  const newName = generateCreepName(creepRole);
  const spawnResult = getMainSpawn().spawnCreep(
    bodyParts,
    newName,
    {memory: {role: creepRole}}
  );
  if (spawnResult == ERR_NOT_ENOUGH_ENERGY)
    return false;
  return true;
}


export function generateCreepName(role: string) {
  const config: Config = {
    dictionaries: [names]
  };
  let name = "";
  switch (role) {
    case "universal":
      name = "uni: ";
      break;
    case "upgrader.level1":
      name = "u1: ";
      break;
    case "upgrader.level2":
      name = "u2: ";
      break;
    case "upgrader.level3":
      name = "u3: ";
      break;
    case "builder.level1":
      name = "b1: ";
      break;
    case "builder.level2":
      name = "b2: ";
      break;
    case "builder.level3":
      name = "b3: ";
      break;
    case "carry.level1":
      name = "c1: ";
      break;
    case "carry.level2":
      name = "c2: ";
      break;
    case "carry.level3":
      name = "c3: ";
      break;
    case "miner.level3":
      name = "m3: ";
      break;
    case "miner.level2":
      name = "m2: ";
      break;
    case "miner.level1":
      name = "m1: ";
      break;
    case "defender.ranged":
      name = "d.r: ";
      break;
    case "supplier":
      name = "s: ";
      break;
    case "healer.level1":
      name = "h1: ";
      break;
  }
  const characterName: string = uniqueNamesGenerator(config);
  return name + characterName;
}

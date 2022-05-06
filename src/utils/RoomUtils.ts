export function getMainRoom(): Room {
  return getMainSpawn().room;
}

export function getMainController(): StructureController {
  return <StructureController>getMainRoom().controller;
}

export function getMainSpawn(): StructureSpawn {
  return Game.spawns["Spawn1"];
}

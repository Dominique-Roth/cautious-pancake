function healDamagedCreeps(creep: Creep) {
  const damagedCreepsInRoom = creep.room.find(FIND_MY_CREEPS, {filter: creep => creep.hits < creep.hitsMax});
  const healTarget = creep.pos.findClosestByRange(damagedCreepsInRoom) as Creep;
  const healResult = creep.rangedHeal(healTarget);
  if (healResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(healTarget);
  }
}

import { buildCreep } from "../utils/utils.spawn";

export namespace roleHealerLevel1 {
  export const roleName = "healer.level1";

  export function setBuildState() {
    switch (Memory.currentColonyGoal) {
      default:
        Memory.maxHealerLevel1CreepsAmount = 3;
        break;
    }
  }

  export function handleAutoBuild() {
    const healer = _.filter(Game.creeps,(creep) => creep.memory.role === roleName);
    if (healer.length < Memory.maxHealerLevel1CreepsAmount) return build();
    return false;
  }

  /** start */
  export function build() {
    buildCreep(
      roleName,
      [MOVE,HEAL,HEAL,HEAL,HEAL,HEAL]
    );
  }

  export function run(creep: Creep) {
    healDamagedCreeps(creep);
  }
}

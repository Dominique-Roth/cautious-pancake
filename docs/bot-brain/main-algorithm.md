# Main Algorithm per game state

## Notes

- Give Controller `1 Energy` when the downgrade timer is below 1000.

## State **(controllerLevel1)**:

1. Build `universal` creep
2. `universal` creep to upgrade to Controller Level 2

## State **(controllerLevel2)**:

1. Build `miner` creep
3. `builder` & `universal` to build `5 Extensions`
2. Build `builder` creep
4. Build `miner` creep
5. Build `6 carry` creeps
6. `builder` & `universal` building `Roads` between `Controller, Extensions` and closest energy source. 2 roads at once
   up to 4 while in this state.
7. Build up to 4 `universal` creep
8. Fill `Extensions`, keep as highest energy priority
9. Split available energy for `Spawn` & upcoming `repairer`
10. `builder` to build `Walls`, don't repair them yet!
11. Build `Rampart`
12. Build `repairer` creep, repair all `Ramparts, Walls` to 10k HP
13. Build `scout` creep
14. Start `Controller` upgrade

## State **(controllerLevel3)**:

1. `builder` to build N `extensions`
2. Build `repairer` creeps
4. Build `Walls`
5. Build `defense.ranged` creep
6. Upgrade `Room Controller`

## State **(controllerLevel4)**:

1. `builder` to build `Storage`
2. Build `storage-manager` creep
3. `builder` to build N extensions
4. Fill `Storage`


import { sample, sum } from 'lodash';

import { Hero, Adventure, IGameTown, HeroStat, HeroJobActionTargetting, HeroJobAction } from '../interfaces';
import { generateMonster, getCurrentStat } from './hero';
import { JobEffects } from '../static';

export function getTownExpMultiplier(town: IGameTown): number {
  return 0.1;
}

export function getTownGoldMultiplier(town: IGameTown): number {
  return 1;
}

// team members can only fight if they have HP and STA > 0
function canMemberFight(member: Hero): boolean {
  return getCurrentStat(member, HeroStat.HP) > 0 && getCurrentStat(member, HeroStat.STA) > 0;
}

function canTeamFight(team: Hero[]): boolean {
  return team.some(h => canMemberFight(h));
}

function teamFightingMembers(team: Hero[]): Hero[] {
  return team.filter(h => canMemberFight(h));
}

function shouldCombatContinue(adventurers: Hero[], monsters: Hero[]): boolean {
  return canTeamFight(adventurers) && canTeamFight(monsters);
}

function potentialActions(creature: Hero, targetting: HeroJobActionTargetting): HeroJobAction[] {
  const potentialCreatureActions = JobEffects[creature.job].actions;
  return potentialCreatureActions.filter(act => {
    if (getCurrentStat(creature, HeroStat.STA) < act.staCost()) { return false; }
    if (getCurrentStat(creature, HeroStat.SP) < act.spCost()) { return false; }
    if (act.targets(targetting).length === 0) { return false; }
    return true;
  });
}

function chooseAction(creature: Hero, targetting: HeroJobActionTargetting): HeroJobAction | undefined {
  return sample(potentialActions(creature, targetting));
}

function takeTurn(creature: Hero, targetting: HeroJobActionTargetting): void {

  // no targets? nothing happens.
  if (targetting.livingEnemies.length === 0) { return; }

  const action = chooseAction(creature, targetting);
  if (!action) { return; }

  action.act(creature, action.targets(targetting));
  creature.currentStats[HeroStat.STA] -= action.staCost();
  creature.currentStats[HeroStat.SP] -= action.spCost();
}

export function doCombat(town: IGameTown, heroes: Hero[], adventure: Adventure): void {

  // generate 1 monster per hero
  const monsters = heroes.map(() => generateMonster(town, adventure));

  // TODO: pre-combat actions

  // while combat goes on, everyone who can fight gets a turn
  while (shouldCombatContinue(heroes, monsters)) {
    teamFightingMembers(heroes).forEach(h => takeTurn(h, { allAllies: heroes, livingEnemies: teamFightingMembers(monsters) }));
    teamFightingMembers(monsters).forEach(m => takeTurn(m, { allAllies: monsters, livingEnemies: teamFightingMembers(heroes) }));

    console.log(heroes, monsters);
  }

  const expMult = getTownExpMultiplier(town);
  const goldMult = getTownGoldMultiplier(town);

  const earnedExp = sum(monsters.map(m => m.stats[HeroStat.EXP]));
  const earnedGold = sum(monsters.map(m => m.stats[HeroStat.GOLD]));

  console.log(earnedExp, earnedGold);

  // TODO: post-combat actions

  // TODO: give EXP based on level difference * difficulty
  // TODO: give gold based on enemy spawned gold
  // TODO: inn should restore hp/sta at a rate of 1/sec - heroes should probably have a resting status if they're currently at the inn and it should be displayed in the list
}

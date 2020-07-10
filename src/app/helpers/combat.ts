
import { sample, sum } from 'lodash';

import { Hero, Adventure, IGameTown, HeroStat, HeroJobActionTargetting, HeroJobAction, TriggerType } from '../interfaces';
import { generateMonster, getCurrentStat, giveHeroGold, giveHeroEXP } from './hero';
import { JobEffects } from '../static';
import { doesTownHaveFeature } from './global';

export function getTownExpMultiplier(town: IGameTown): number {
  let base = 0.1;

  if (doesTownHaveFeature(town, 'Monster Experience I'))   { base += 0.1; }
  if (doesTownHaveFeature(town, 'Monster Experience II'))  { base += 0.1; }
  if (doesTownHaveFeature(town, 'Monster Experience III')) { base += 0.1; }

  return base;
}

export function getTownGoldMultiplier(town: IGameTown): number {
  let base = 1;

  if (doesTownHaveFeature(town, 'Monster Gold I'))   { base += 0.5; }
  if (doesTownHaveFeature(town, 'Monster Gold II'))  { base += 0.5; }
  if (doesTownHaveFeature(town, 'Monster Gold III')) { base += 0.5; }

  return base;
}

// team members can only fight if they have HP and STA > 0
export function canMemberFight(member: Hero): boolean {
  return getCurrentStat(member, HeroStat.HP) > 0 && getCurrentStat(member, HeroStat.STA) > 0;
}

export function canTeamFight(team: Hero[]): boolean {
  return team.some(h => canMemberFight(h));
}

export function teamFightingMembers(team: Hero[]): Hero[] {
  return team.filter(h => canMemberFight(h)).filter(Boolean);
}

export function shouldCombatContinue(adventurers: Hero[], monsters: Hero[]): boolean {
  return canTeamFight(adventurers) && canTeamFight(monsters);
}

export function getCombatTriggers(hero: Hero, trigger: TriggerType): HeroJobAction[] {
  const jobStatic = JobEffects[hero.job];
  const triggers = jobStatic.combatTriggers[trigger];

  return triggers || [];
}

function canTakeAction(creature: Hero, action: HeroJobAction, targetting: HeroJobActionTargetting): boolean {
  if (getCurrentStat(creature, HeroStat.STA) < action.staCost()) { return false; }
  if (getCurrentStat(creature, HeroStat.SP) < action.spCost()) { return false; }
  if (action.targets(targetting).filter(Boolean).length === 0) { return false; }
  return true;
}

function potentialActions(creature: Hero, targetting: HeroJobActionTargetting): HeroJobAction[] {
  const potentialCreatureActions = JobEffects[creature.job].actions;
  return potentialCreatureActions.filter(act => canTakeAction(creature, act, targetting));
}

function prepareHeroForCombat(hero: Hero): void {
  [HeroStat.HP, HeroStat.SP, HeroStat.STA].forEach(stat => {
    hero.currentStats[stat] = Math.min(hero.currentStats[stat], hero.stats[stat]);
  });
}

function chooseAction(creature: Hero, targetting: HeroJobActionTargetting): HeroJobAction | undefined {
  return sample(potentialActions(creature, targetting));
}

function takeAction(creature: Hero, action: HeroJobAction, targetting: HeroJobActionTargetting): void {
  if (!canTakeAction(creature, action, targetting)) { return; }

  action.act(creature, action.targets(targetting).filter(Boolean));
  creature.currentStats[HeroStat.STA] -= action.staCost();
  creature.currentStats[HeroStat.SP] -= action.spCost();
}

function takeTurn(creature: Hero, targetting: HeroJobActionTargetting): void {

  // no targets? nothing happens.
  if (targetting.livingEnemies.length === 0) { return; }

  const action = chooseAction(creature, targetting);
  if (!action) { return; }

  takeAction(creature, action, targetting);
}

function generateTargetting(self: Hero, heroes: Hero[], monsters: Hero[]): HeroJobActionTargetting {
  return {
    self,
    all: heroes.concat(monsters),
    allAllies: heroes,
    livingAllies: teamFightingMembers(heroes),
    livingEnemies: teamFightingMembers(monsters)
  };
}

export function doCombat(town: IGameTown, heroes: Hero[], adventure: Adventure): void {

  // generate 1 monster per hero
  const monsters = heroes.map(() => generateMonster(town, adventure));

  // prepare heroes for combat
  heroes.forEach(hero => prepareHeroForCombat(hero));

  // run pre-combat triggers
  teamFightingMembers(heroes).forEach(hero => {
    getCombatTriggers(hero, TriggerType.PreCombat)
      .forEach(act => takeAction(hero, act, generateTargetting(hero, heroes, monsters)));
  });

  // while combat goes on, everyone who can fight gets a turn
  while (shouldCombatContinue(heroes, monsters)) {
    teamFightingMembers(heroes).forEach(h => takeTurn(h, generateTargetting(h, heroes, monsters)));
    teamFightingMembers(monsters).forEach(m => takeTurn(m, generateTargetting(m, monsters, heroes)));
  }

  // run post-combat triggers
  teamFightingMembers(heroes).forEach(hero => {
    getCombatTriggers(hero, TriggerType.PostCombat)
      .forEach(act => takeAction(hero, act, generateTargetting(hero, heroes, monsters)));
  });

  // if they can still fight, they won
  if (canTeamFight(heroes)) {

    // run pre-combat triggers
    heroes.forEach(hero => {
      getCombatTriggers(hero, TriggerType.Victory)
        .forEach(act => takeAction(hero, act, generateTargetting(hero, heroes, monsters)));
    });

    const expMult = getTownExpMultiplier(town);
    const goldMult = getTownGoldMultiplier(town);

    const earnedExp = Math.floor(expMult * sum(monsters.map(m => getCurrentStat(m, HeroStat.EXP))));
    const earnedGold = Math.floor(goldMult * sum(monsters.map(m => getCurrentStat(m, HeroStat.GOLD))));

    heroes.forEach(hero => {
      giveHeroEXP(hero, earnedExp);
      giveHeroGold(hero, earnedGold);
    });
  }
}

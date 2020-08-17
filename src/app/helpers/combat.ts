
import { random, sample, sum } from 'lodash';

import { Hero, Adventure, GameTown, HeroStat, HeroActionTargetting,
  HeroAction, TriggerType, ItemType, CombatLog, Combat, HeroTrackedStat, Building, TownStat } from '../interfaces';
import { generateMonster, checkHeroLevelUp, convertHeroLearnedSkillsToSkills } from './hero';
import { JobEffects } from '../static';
import { addCombatLogToTown, doesTownHaveFeature, formatNumber,
  getCurrentStat, giveHeroEXP, giveHeroGold, increaseTrackedStat, getHeroTag, numAllocatedToBuilding } from './global';
import { getActionsForWeapon } from './weapon';

export function getTownExpMultiplier(town: GameTown): number {
  let base = 1.1;

  if (doesTownHaveFeature(town, 'Monster Experience I'))   { base += 0.3; }
  if (doesTownHaveFeature(town, 'Monster Experience II'))  { base += 0.3; }
  if (doesTownHaveFeature(town, 'Monster Experience III')) { base += 0.3; }

  base += numAllocatedToBuilding(town, Building.Cave) * 0.01;

  base += Number(town.stats[TownStat.Legendary].Adventures || 0) * 0.01;

  return base;
}

export function getTownGoldMultiplier(town: GameTown): number {
  let base = 1.1;

  if (doesTownHaveFeature(town, 'Monster Gold I'))   { base += 0.3; }
  if (doesTownHaveFeature(town, 'Monster Gold II'))  { base += 0.3; }
  if (doesTownHaveFeature(town, 'Monster Gold III')) { base += 0.3; }

  base += numAllocatedToBuilding(town, Building.Cave) * 0.01;

  base += Number(town.stats[TownStat.Legendary].Adventures || 0) * 0.01;

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

export function getCombatTriggers(hero: Hero, trigger: TriggerType): HeroAction[] {
  const jobStatic = JobEffects[hero.job];
  const triggers = jobStatic.combatTriggers[trigger];

  return triggers || [];
}

class CombatTracker implements Combat {

  private combatLog: CombatLog;

  constructor(private town: GameTown, private heroes: Hero[], private adventure: Adventure) {}

  public start(): void {

    const town = this.town;
    const heroes = this.heroes;
    const adventure = this.adventure;

    this.combatLog = {
      advName: adventure.name,
      advEncounters: adventure.encounterCount,
      advLevel: adventure.encounterLevel,
      advDifficulty: adventure.difficulty,
      encNum: adventure.encounterCount - adventure.encounterTicks.length,
      timestamp: Date.now(),
      logs: [],
      wasSuccess: false
    };

    // generate 1-2 monsters per hero or rand(1, heroes) for legendary
    const numMonsters = adventure.bossName ? random(1, heroes.length) : heroes.length + random(0, heroes.length);
    const monsters = Array(numMonsters).fill(null).map(() => generateMonster(town, adventure));

    if (adventure.bossName && this.combatLog.encNum === adventure.encounterCount - 1) {
      monsters[0].name = adventure.bossName;
    }

    this.addLogEntry(`Heroes: ${heroes.map(h => this.getHeroTag(h)).join(', ')}`);
    this.addLogEntry(`Monsters: ${monsters.map(m => this.getHeroTag(m)).join(', ')}`);

    // prepare heroes for combat
    heroes.forEach(hero => this.prepareHeroForCombat(hero));

    // run pre-combat triggers
    teamFightingMembers(heroes).forEach(hero => {
      getCombatTriggers(hero, TriggerType.PreCombat)
        .forEach(act => this.takeAction(hero, act, this.generateTargetting(hero, heroes, monsters)));
    });

    // while combat goes on, everyone who can fight gets a turn
    while (shouldCombatContinue(heroes, monsters)) {
      teamFightingMembers(heroes).forEach(h => this.takeTurn(h, this.generateTargetting(h, heroes, monsters)));
      teamFightingMembers(monsters).forEach(m => this.takeTurn(m, this.generateTargetting(m, monsters, heroes)));
    }

    // run post-combat triggers
    teamFightingMembers(heroes).forEach(hero => {
      getCombatTriggers(hero, TriggerType.PostCombat)
        .forEach(act => this.takeAction(hero, act, this.generateTargetting(hero, heroes, monsters)));
    });

    // if they can still fight, they won
    if (canTeamFight(heroes)) {

      this.combatLog.wasSuccess = true;

      // run pre-combat triggers
      heroes.forEach(hero => {
        getCombatTriggers(hero, TriggerType.Victory)
          .forEach(act => this.takeAction(hero, act, this.generateTargetting(hero, heroes, monsters)));
      });

      const expMult = getTownExpMultiplier(town);
      const goldMult = getTownGoldMultiplier(town);

      const earnedExp = Math.floor((expMult * sum(monsters.map(m => getCurrentStat(m, HeroStat.EXP)))) / heroes.length);
      const earnedGold = Math.floor((goldMult * sum(monsters.map(m => getCurrentStat(m, HeroStat.GOLD)))) / heroes.length);

      heroes.forEach(hero => {
        this.addLogEntry(`${this.getHeroTag(hero)} won combat and earned ${formatNumber(earnedExp)} EXP and ${formatNumber(earnedGold)} GOLD!`);
        giveHeroEXP(hero, earnedExp);
        checkHeroLevelUp(hero);
        giveHeroGold(hero, earnedGold);
      });

    } else {
      heroes.forEach(h => {
        this.addLogEntry(`${this.getHeroTag(h)} lost combat!`);
      });

    }

    addCombatLogToTown(town, this.combatLog);
  }

  private canTakeAction(creature: Hero, action: HeroAction, targetting: HeroActionTargetting): boolean {
    if (getCurrentStat(creature, HeroStat.STA) < action.staCost()) { return false; }
    if (getCurrentStat(creature, HeroStat.SP) < action.spCost())   { return false; }
    if (action.targets(targetting).filter(Boolean).length === 0)   { return false; }
    return true;
  }

  private potentialActions(creature: Hero, targetting: HeroActionTargetting): HeroAction[] {

    // base job actions
    const potentialCreatureActions = JobEffects[creature.job].actions(creature);

    // weapon actions
    creature.gear[ItemType.Weapon].forEach(weapon => {
      const bonusActions = getActionsForWeapon(weapon);
      potentialCreatureActions.push(...bonusActions);
    });

    potentialCreatureActions.push(...convertHeroLearnedSkillsToSkills(creature));

    return potentialCreatureActions.filter(act => this.canTakeAction(creature, act, targetting));
  }

  private prepareHeroForCombat(hero: Hero): void {
    if (!canMemberFight(hero)) { return; }

    // use potions before combat
    const usedPotions: string[] = [];

    hero.gear[ItemType.Potion].forEach(potion => {
      // if we can use at least a third of the value of the potion, we will
      const anyStatsOver = potion.boostStats.some(({ stat, value }) => hero.currentStats[stat] + (value / 3) < hero.stats[stat]);

      if (anyStatsOver) {
        potion.boostStats.forEach(({ stat, value }) => {
          hero.currentStats[stat] = Math.min(hero.stats[stat], hero.currentStats[stat] + value);
        });

        this.addLogEntry(`${hero.name} used ${potion.name} and restored ${potion.boostStats.map(({ stat, value }) => `${value} ${stat.toUpperCase()}`).join(', ')}.`);

        usedPotions.push(potion.uuid);
      }
    });

    increaseTrackedStat(hero, HeroTrackedStat.PotionsUsed, usedPotions.length);

    hero.gear[ItemType.Potion] = hero.gear[ItemType.Potion].filter(p => !usedPotions.includes(p.uuid));

    [HeroStat.HP, HeroStat.SP, HeroStat.STA].forEach((stat: HeroStat) => {
      hero.currentStats[stat] = Math.min(hero.currentStats[stat], hero.stats[stat]);
    });
  }

  private chooseAction(creature: Hero, targetting: HeroActionTargetting): HeroAction | undefined {
    return sample(this.potentialActions(creature, targetting));
  }

  private takeAction(creature: Hero, action: HeroAction, targetting: HeroActionTargetting): void {
    if (!this.canTakeAction(creature, action, targetting)) { return; }

    action.act(this, creature, action.targets(targetting).filter(Boolean));
    creature.currentStats[HeroStat.STA] -= action.staCost();
    creature.currentStats[HeroStat.SP] -= action.spCost();
  }

  private takeTurn(creature: Hero, targetting: HeroActionTargetting): void {

    // no targets? nothing happens.
    if (targetting.livingEnemies.length === 0) { return; }

    const action = this.chooseAction(creature, targetting);
    if (!action) { return; }

    this.takeAction(creature, action, targetting);
  }

  private generateTargetting(self: Hero, heroes: Hero[], monsters: Hero[]): HeroActionTargetting {
    return {
      self,
      all: heroes.concat(monsters),
      allAllies: heroes,
      livingAllies: teamFightingMembers(heroes),
      livingEnemies: teamFightingMembers(monsters)
    };
  }

  public getHeroTag(hero: Hero): string {
    return getHeroTag(hero);
  }

  public addLogEntry(logEntry: string): void {
    this.combatLog.logs.push(logEntry);
  }
}

export function doCombat(town: GameTown, heroes: Hero[], adventure: Adventure): void {
  const combat = new CombatTracker(town, heroes, adventure);
  combat.start();
}

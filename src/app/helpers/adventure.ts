import { GameTown, Adventure, Hero, AdventureDifficulty, HeroItem, ItemType,
  HeroStat, HeroGear, HeroWeapon, HeroArmor, CombatLog, HeroTrackedStat, TownStat } from '../interfaces';
import { getTownHeroByUUID, checkHeroLevelUp, calculateMaxHeldPotions,
  calculateMaxHeldWeapons, canEquipWeapon, calculateMaxHeldArmors, canEquipArmor } from './hero';
import { doCombat, getTownExpMultiplier, getTownGoldMultiplier, canTeamFight } from './combat';
import { addCombatLogToTown, doesTownHaveFeature, formatNumber, giveHeroEXP, giveHeroGold, increaseTrackedStat, increaseTownStat } from './global';
import { getBazaarLoanPercent } from './bazaar';

export function formatDifficulty(difficulty: AdventureDifficulty): string {
  const difficultyStrings: Record<AdventureDifficulty, string> = {
    [AdventureDifficulty.VeryEasy]:       'Very Easy',
    [AdventureDifficulty.Easy]:           'Easy',
    [AdventureDifficulty.Normal]:         'Normal',
    [AdventureDifficulty.Hard]:           'Hard',
    [AdventureDifficulty.VeryHard]:       'Very Hard',
    [AdventureDifficulty.Tough]:          'Tough',
    [AdventureDifficulty.Challenging]:    'Challenging',
    [AdventureDifficulty.Extreme]:        'Extreme',
    [AdventureDifficulty.LegendaryStart]: 'Legendary'
  };

  if (difficulty >= AdventureDifficulty.LegendaryStart) { return 'Legendary'; }

  return difficultyStrings[difficulty] || 'Unknown';
}

export function calculateMaxMembersPerTeam(town: GameTown): number {
  let base = 1;

  if (doesTownHaveFeature(town, 'Teamwork I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Teamwork II')) { base += 1; }

  return base;
}

export function calculateMaxActiveAdventures(town: GameTown): number {
  let base = 1;

  if (doesTownHaveFeature(town, 'Tunnels I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Tunnels II')) { base += 1; }

  return base;
}

export function calculateMaxPotentialAdventures(town: GameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Infestation I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Infestation II')) { base += 1; }

  return base;
}

export function calculateMaxNumberAdventureEncounters(town: GameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Deeper Cave I'))  { base += 2; }
  if (doesTownHaveFeature(town, 'Deeper Cave II')) { base += 2; }

  return base;
}

export function calculateAvailableDifficulties(town: GameTown, canBeDifficult = false): AdventureDifficulty[] {
  const base = [
    AdventureDifficulty.VeryEasy, AdventureDifficulty.Easy,
    AdventureDifficulty.Normal,
    AdventureDifficulty.Hard, AdventureDifficulty.VeryHard
  ];

  if (canBeDifficult && doesTownHaveFeature(town, 'Tougher Adventures I'))   { base.push(AdventureDifficulty.Tough); }
  if (canBeDifficult && doesTownHaveFeature(town, 'Tougher Adventures II'))  { base.push(AdventureDifficulty.Challenging); }
  if (canBeDifficult && doesTownHaveFeature(town, 'Tougher Adventures III')) { base.push(AdventureDifficulty.Extreme); }

  return base;
}

export function heroBuyItemsBeforeAdventure(town: GameTown, hero: Hero): HeroGear {
  const discountMultiplier = 1 - (getBazaarLoanPercent(town) / 100);
  let totalCost = 0n;

  const totalItemCost = (item: HeroItem) => BigInt(Math.floor(Number(item.cost) * discountMultiplier));

  // buy potions
  const potionsHeroWants: HeroItem[] = [];
  const maxPotions = calculateMaxHeldPotions(town, hero);
  if (hero.gear[ItemType.Potion].length < maxPotions) {
    const itemsToBuy = maxPotions - hero.gear[ItemType.Potion].length;
    let boughtPotions = 0;

    town.itemsForSale[ItemType.Potion].forEach(item => {
      const itemCost = totalItemCost(item);
      if (totalCost + itemCost > hero.currentStats[HeroStat.GOLD] || boughtPotions >= itemsToBuy) { return; }
      totalCost += itemCost;
      potionsHeroWants.push(item);
      boughtPotions++;
    });
  }

  // buy weapons
  const maxWeapons = calculateMaxHeldWeapons(town, hero);
  const boughtWeapons: HeroWeapon[] = [];
  for (let i = 0; i < maxWeapons; i++) {
    town.itemsForSale[ItemType.Weapon].forEach((item: HeroWeapon) => {
      const itemCost = totalItemCost(item);
      if (boughtWeapons[i] || boughtWeapons.map(x => x.uuid).includes(item.uuid)) { return; }
      if (totalCost + itemCost > BigInt(hero.currentStats[HeroStat.GOLD])) { return; }
      if (!canEquipWeapon(town, hero, item)) {
        item.timesPassedOver++;
        return;
      }
      if (hero.gear[ItemType.Weapon][i] && hero.gear[ItemType.Weapon][i].cost > itemCost) {
        item.timesPassedOver++;
        return;
      }

      totalCost += itemCost;
      boughtWeapons[i] = item;
    });
  }

  // buy armor
  const maxArmors = calculateMaxHeldArmors(town, hero);
  const boughtArmors: HeroArmor[] = [];
  for (let i = 0; i < maxArmors; i++) {
    town.itemsForSale[ItemType.Armor].forEach((item: HeroArmor) => {
      const itemCost = totalItemCost(item);
      if (boughtArmors[i] || boughtArmors.map(x => x.uuid).includes(item.uuid)) { return; }
      if (totalCost + itemCost > BigInt(hero.currentStats[HeroStat.GOLD])) { return; }
      if (!canEquipArmor(town, hero, item)) {
        item.timesPassedOver++;
        return;
      }
      if (hero.gear[ItemType.Armor][i] && hero.gear[ItemType.Armor][i].cost > itemCost) {
        item.timesPassedOver++;
        return;
      }

      totalCost += itemCost;
      boughtArmors[i] = item;
    });
  }

  increaseTrackedStat(hero, HeroTrackedStat.ItemsBought, boughtWeapons.length + boughtArmors.length + potionsHeroWants.length);

  return {
    [ItemType.Potion]: potionsHeroWants,
    [ItemType.Armor]: boughtArmors,
    [ItemType.Weapon]: boughtWeapons
  };
}

export function tickAdventure(town: GameTown, adv: Adventure): string | undefined {
  adv.encounterTicks[0]--;

  let isTeamFighting = true;

  if (adv.encounterTicks[0] < 0) {
    isTeamFighting = doAdventureEncounter(town, adv);
    adv.encounterTicks.shift();
  }

  if (!isTeamFighting || adv.encounterTicks.length === 0) {
    const didSucceed = finalizeAdventure(town, adv);
    town.activeAdventures = town
      .activeAdventures.filter(a => a.uuid !== adv.uuid);

    const heroNames = adv.activeHeroes.map(uuid => town.recruitedHeroes.find(h => h.uuid === uuid)).filter(Boolean) as Hero[];
    const postMsg = didSucceed ? 'it was a success!' : 'it was a failure.';

    return `${heroNames.map(x => x.name).join(', ')} ${heroNames.length === 1 ? 'has' : 'have'} returned from their adventure - ${postMsg}`;
  }
}

export function doAdventureEncounter(town: GameTown, adventure: Adventure): boolean {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];
  doCombat(town, chosenHeroes, adventure);

  const didWin = canTeamFight(chosenHeroes);

  chosenHeroes.forEach(hero => {
    increaseTrackedStat(hero, HeroTrackedStat.TotalEncounters, 1);
    if (didWin) {
      increaseTrackedStat(hero, HeroTrackedStat.EncountersSucceeded, 1);
      increaseTownStat(town, TownStat.Encounters, hero, 1);
    }
  });

  return didWin;
}

export function bonusMultiplierForAdventure(adventure: Adventure): number {
  let bonusMultiplier = 1;

  if (adventure.difficulty >= AdventureDifficulty.Tough) {
    bonusMultiplier = 5;
  }

  if (adventure.difficulty >= AdventureDifficulty.Challenging) {
    bonusMultiplier = 10;
  }

  if (adventure.difficulty >= AdventureDifficulty.Extreme) {
    bonusMultiplier = 20;
  }

  if (adventure.difficulty >= AdventureDifficulty.LegendaryStart) {
    bonusMultiplier = 100;
  }

  return bonusMultiplier;
}

export function finalizeAdventure(town: GameTown, adventure: Adventure): boolean {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];

  const expMult = getTownExpMultiplier(town);
  const goldMult = getTownGoldMultiplier(town);

  const baseReward = adventure.encounterCount * adventure.encounterLevel * adventure.difficulty;
  const bonusMultiplier = bonusMultiplierForAdventure(adventure);

  const expReward = Math.floor(100 * baseReward * bonusMultiplier * expMult);
  const goldReward = Math.floor(10 * baseReward * bonusMultiplier * goldMult);

  const didSucceed = canTeamFight(chosenHeroes);

  chosenHeroes.forEach(h => {
    h.onAdventure = '';

    increaseTrackedStat(h, HeroTrackedStat.TotalAdventures, 1);
  });

  if (didSucceed) {

    const combatLog: CombatLog = {
      advName: `${adventure.name} Bonus Reward`,
      advEncounters: adventure.encounterCount,
      advLevel: adventure.encounterLevel,
      advDifficulty: adventure.difficulty,
      encNum: adventure.encounterCount,
      timestamp: Date.now(),
      logs: [],
      wasSuccess: true
    };

    if (adventure.difficulty >= AdventureDifficulty.LegendaryStart) {
      town.stats[TownStat.Legendary].Adventures = town.stats[TownStat.Legendary].Adventures || 0n;
      town.stats[TownStat.Legendary].Adventures++;

      const goldEarned = ((adventure.difficulty - AdventureDifficulty.LegendaryStart) + 1) * 5_000_000;
      town.gold += BigInt(goldEarned);
      combatLog.logs.push(`Rasterkhann earned ${formatNumber(goldEarned)} GOLD for this legendary adventure!`);
    }

    chosenHeroes.forEach(h => {
      increaseTrackedStat(h, HeroTrackedStat.AdventuresSucceeded, 1);
      increaseTownStat(town, TownStat.Adventures, h, 1);

      giveHeroEXP(h, expReward);
      checkHeroLevelUp(h);
      giveHeroGold(h, goldReward);

      increaseTownStat(town, TownStat.Gold, h, goldReward);

      combatLog.logs.push(`${h.name} earned ${formatNumber(expReward)} EXP and ${formatNumber(goldReward)} GOLD.`);
    });

    addCombatLogToTown(town, combatLog);
  }

  return didSucceed;
}

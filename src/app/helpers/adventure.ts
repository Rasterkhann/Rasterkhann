import { IGameTown, Adventure, Hero, AdventureDifficulty, HeroItem, ItemType, HeroStat, HeroGear, HeroWeapon, HeroArmor } from '../interfaces';
import { getTownHeroByUUID, checkHeroLevelUp, giveHeroEXP, giveHeroGold, calculateMaxHeldPotions,
  calculateMaxHeldWeapons, canEquipWeapon, calculateMaxHeldArmors } from './hero';
import { doCombat, getTownExpMultiplier, getTownGoldMultiplier, canTeamFight } from './combat';
import { doesTownHaveFeature } from './global';

export function calculateMaxActiveAdventures(town: IGameTown): number {
  let base = 1;

  if (doesTownHaveFeature(town, 'Tunnels I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Tunnels II')) { base += 1; }

  return base;
}

export function calculateMaxPotentialAdventures(town: IGameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Infestation I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Infestation II')) { base += 1; }

  return base;
}

export function calculateMaxNumberAdventureEncounters(town: IGameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Deeper Cave I'))  { base += 2; }
  if (doesTownHaveFeature(town, 'Deeper Cave II')) { base += 2; }

  return base;
}

export function calculateAvailableDifficulties(town: IGameTown): AdventureDifficulty[] {
  return [
    AdventureDifficulty.VeryEasy, AdventureDifficulty.Easy,
    AdventureDifficulty.Normal,
    AdventureDifficulty.Hard, AdventureDifficulty.VeryHard
  ];
}

export function heroBuyItemsBeforeAdventure(town: IGameTown, hero: Hero): HeroGear {
  let totalCost = 0n;

  // buy potions
  const potionsHeroWants: HeroItem[] = [];
  const maxPotions = calculateMaxHeldPotions(town, hero);
  if (hero.gear[ItemType.Potion].length < maxPotions) {
    const itemsToBuy = maxPotions - hero.gear[ItemType.Potion].length;
    let boughtPotions = 0;

    town.itemsForSale[ItemType.Potion].forEach(item => {
      if (totalCost + item.cost > hero.currentStats[HeroStat.GOLD] || boughtPotions >= itemsToBuy) { return; }
      totalCost += item.cost;
      potionsHeroWants.push(item);
      boughtPotions++;
    });
  }

  // buy weapons
  const maxWeapons = calculateMaxHeldWeapons(town, hero);
  const boughtWeapons: HeroWeapon[] = [];
  for (let i = 0; i < maxWeapons; i++) {
    town.itemsForSale[ItemType.Weapon].forEach((item: HeroWeapon) => {
      if (boughtWeapons[i] || boughtWeapons.map(x => x.uuid).includes(item.uuid)) { return; }
      if (!canEquipWeapon(hero, item)) { return; }
      if (totalCost + item.cost > BigInt(hero.currentStats[HeroStat.GOLD])) { return; }
      if (hero.gear[ItemType.Weapon][i] && hero.gear[ItemType.Weapon][i].cost > item.cost) { return; }

      totalCost += item.cost;
      boughtWeapons[i] = item;
    });
  }

  // buy armor
  const maxArmors = calculateMaxHeldArmors(town, hero);
  const boughtArmors: HeroArmor[] = [];
  for (let i = 0; i < maxArmors; i++) {
    town.itemsForSale[ItemType.Armor].forEach((item: HeroArmor) => {
      if (boughtArmors[i] || boughtArmors.map(x => x.uuid).includes(item.uuid)) { return; }
      if (totalCost + item.cost > BigInt(hero.currentStats[HeroStat.GOLD])) { return; }
      if (hero.gear[ItemType.Armor][i] && hero.gear[ItemType.Armor][i].cost > item.cost) { return; }

      totalCost += item.cost;
      boughtArmors[i] = item;
    });
  }

  return {
    [ItemType.Potion]: potionsHeroWants,
    [ItemType.Armor]: boughtArmors,
    [ItemType.Weapon]: boughtWeapons
  };
}

export function tickAdventure(town: IGameTown, adv: Adventure): string | undefined {
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

export function doAdventureEncounter(town: IGameTown, adventure: Adventure): boolean {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];
  doCombat(town, chosenHeroes, adventure);
  return canTeamFight(chosenHeroes);
}

export function finalizeAdventure(town: IGameTown, adventure: Adventure): boolean {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];

  const expMult = getTownExpMultiplier(town);
  const goldMult = getTownGoldMultiplier(town);

  const baseReward = adventure.encounterCount * adventure.encounterLevel * adventure.difficulty;
  const expReward = 10 * baseReward * expMult;
  const goldReward = baseReward * goldMult;

  let didSucceed = false;

  chosenHeroes.forEach(h => {
    h.onAdventure = '';
  });

  if (canTeamFight(chosenHeroes)) {
    didSucceed = true;
    chosenHeroes.forEach(h => {
      giveHeroEXP(h, expReward);
      giveHeroGold(h, goldReward);

      checkHeroLevelUp(h);
    });
  }

  return didSucceed;
}

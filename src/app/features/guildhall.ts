import { BuildingFeature, HeroJob } from '../interfaces';

export const GuildHallFeatures: BuildingFeature[] = [
  {
    name: 'Job: Warrior',
    description: 'Unlock the Warrior job for your heroes.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 10,
    unlocks: {
      job: [HeroJob.Warrior]
    }
  },
  {
    name: 'Job: Thief',
    description: 'Unlock the Thief job for your heroes.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 20,
    unlocks: {
      job: [HeroJob.Thief]
    }
  },
  {
    name: 'Job: Mage',
    description: 'Unlock the Mage job for your heroes.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 30,
    unlocks: {
      job: [HeroJob.Mage]
    }
  },
  {
    name: 'Job: Cleric',
    description: 'Unlock the Cleric job for your heroes.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 30,
    unlocks: {
      job: [HeroJob.Cleric]
    }
  },
];

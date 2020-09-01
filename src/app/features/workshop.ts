import { BuildingFeature, BuildingFeatureTime } from '../interfaces';

export const WorkshopFeatures: BuildingFeature[] = [
  {
    name: 'Automation: Upgrade Buildings',
    description: 'Unlock an option to automatically upgrade buildings.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1
  },
  {
    name: 'Automation: Train Heroes',
    description: 'Unlock an option to automatically train heroes.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1
  },
  {
    name: 'Automation: Adventure',
    description: 'Unlock an option to automatically go on adventures.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1
  },
  {
    name: 'Automation: Scrap Items',
    description: 'Unlock an option to automatically scrap items that are passed over.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1,
    requiresFeature: {
      'Better Prices': 1
    }
  },
  {
    name: 'Automation: Building Features',
    description: 'Unlock an option to automatically purchase building features.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1
  },
  {
    name: 'Automation: Recruit Heroes',
    description: 'Unlock an option to automatically recruit heroes when there is space to do so.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1
  },
  {
    name: 'Automation: Retire Heroes',
    description: 'Unlock an option to automatically retire heroes when they are ready.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1
  },
];

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
];

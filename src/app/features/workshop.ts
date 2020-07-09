import { BuildingFeature } from '../interfaces';

export const WorkshopFeatures: BuildingFeature[] = [
  {
    name: 'Automation: Upgrade Buildings',
    description: 'Unlock an option to automatically upgrade buildings.',
    cost: 1_000_000n,
    upgradeTime: 3600,
    requiresLevel: 1
  },
  {
    name: 'Automation: Train Heroes',
    description: 'Unlock an option to automatically train heroes.',
    cost: 1_000_000n,
    upgradeTime: 3600,
    requiresLevel: 1
  },
  {
    name: 'Automation: Adventure',
    description: 'Unlock an option to automatically go on adventures.',
    cost: 1_000_000n,
    upgradeTime: 3600,
    requiresLevel: 1
  },
];

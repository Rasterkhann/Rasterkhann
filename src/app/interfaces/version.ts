
import { max } from 'lodash';

export enum Version {
  First = 1,
  TrackedStats = 2,
  Durability = 3,
  CleanRefs = 4,
  HeroRetire = 5
}

export const LatestVersion = max(Object.values(Version).filter(Number)) as number;

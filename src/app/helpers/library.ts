
import { Building, GameTown } from '../interfaces';
import { numAllocatedToBuilding } from './global';

export function getLibraryBadTraitModifier(town: GameTown): number {
  let base = 0;

  // level 1 = 6%, level 100 = 20%
  const level = town.buildings[Building.Library].level;
  if (level > 0) {
    base = Math.log2(level * 10) * 2;
  }

  return base;
}

export function getLibraryGoodTraitModifier(town: GameTown): number {
  let base = 0;

  // level 1 = 6%, level 100 = 20%
  const level = numAllocatedToBuilding(town, Building.Library);
  if (level > 0) {
    base = Math.log2(level * 10) * 2;
  }

  return base;
}

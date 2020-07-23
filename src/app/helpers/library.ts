
import { Building, IGameTown } from '../interfaces';

export function getLibraryTraitModifier(town: IGameTown): number {
  let base = 0;

  // level 1 = 6%, level 100 = 20%
  const level = town.buildings[Building.Library].level;
  if (level > 0) {
    base = Math.log2(level * 10) * 2;
  }

  return base;
}

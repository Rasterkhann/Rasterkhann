import { GameTown, Building } from '../interfaces';
import { numAllocatedToBuilding } from './global';

export function getBazaarLoanPercent(town: GameTown): number {
  let base = 0;

  // level 1 = 8.4%, level 100 = 28.5%
  const level = numAllocatedToBuilding(town, Building.Bazaar);
  if (level > 0) {
    base = Math.log2(level * 7) * 3;
  }

  return base;
}

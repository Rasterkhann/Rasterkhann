import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as NumberFormat from 'swarm-numberformat';

@Pipe({
  name: 'bignum'
})
export class BignumPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: bigint, ...args: unknown[]): string {
    if (value < 1_000_000n) { return this.decimalPipe.transform(value.toString()); }
    return NumberFormat.format(value.toString(), { flavor: 'short', sigfigs: 3 });
  }

}

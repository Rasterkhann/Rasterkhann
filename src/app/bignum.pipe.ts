import { Pipe, PipeTransform } from '@angular/core';

import * as NumberFormat from 'swarm-numberformat';

@Pipe({
  name: 'bignum'
})
export class BignumPipe implements PipeTransform {

  transform(value: bigint, ...args: unknown[]): string {
    return NumberFormat.format(value.toString(), { flavor: 'short' });
  }

}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'percentage',
})
export class PercentagePipe implements PipeTransform {
  transform(value: number, total: number) {
    if (!total) {
      return 0 + ' %';
    }
    return ((value / total) * 100).toFixed(2) + ' %';
  }
}

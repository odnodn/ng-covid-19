import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFilter',
})
export class DateFilterPipe implements PipeTransform {
  transform(items: any[], date: string) {
    return items.find((item) => item.date === date);
  }
}

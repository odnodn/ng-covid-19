import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferFilter',
})
export class TransferFilterPipe implements PipeTransform {
  transform(data: any, valueStart: any, valueEnd: any): any {
    if (valueStart && valueEnd) {
      if (valueEnd.name === 'Europe') {
        return data.filter((item) => item.startRegion === valueStart?.name && item.endCountry);
      }
      return data.filter((item) => item.startRegion === valueStart?.name && item.endRegion === valueEnd?.name);
    }
    if (valueStart) {
      return data.filter((item) => item.startRegion === valueStart?.name);
    }
    if (valueEnd) {
      if (valueEnd.name === 'Europe') {
        return data.filter((item) => item.endCountry);
      }
      return data.filter((item) => item.endRegion === valueEnd?.name);
    }
    return data;
  }
}

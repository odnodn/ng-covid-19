import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferFilter',
})
export class TransferFilterPipe implements PipeTransform {
  transform(data: any, valueStart: any, valueEnd: any, sort: string): any {
    let returnData = data;
    if (valueStart && valueEnd) {
      if (valueEnd.name === 'Europe') {
        returnData = data.filter((item) => item.startRegion === valueStart?.name && item.endCountry);
      } else {
        returnData = data.filter((item) => item.startRegion === valueStart?.name && item.endRegion === valueEnd?.name);
      }
    } else if (valueStart) {
      returnData = data.filter((item) => item.startRegion === valueStart?.name);
    } else if (valueEnd) {
      if (valueEnd.name === 'Europe') {
        returnData = data.filter((item) => item.endCountry);
      } else {
        returnData = data.filter((item) => item.endRegion === valueEnd?.name);
      }
    }
    if (returnData && sort) {
      if (sort === 'Date de fin de transfert le plus récent') {
        return returnData.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
      }
      if (sort === 'Date de début de transfert le plus récent') {
        return returnData.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      }
      if (sort === 'Le plus grand nombre de patients transférés') {
        return returnData.sort((a, b) => b.numberPatients - a.numberPatients);
      }
    }
  }
}

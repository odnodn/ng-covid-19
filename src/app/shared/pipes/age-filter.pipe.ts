import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ageFilter',
})
export class AgeFilterPipe implements PipeTransform {
  transform(items: any[], selectedAge: string) {
    const age = {
      ageAll: 'tous',
      ageA: '-15',
      ageB: '15-44',
      ageC: '45-64',
      ageD: '65-74',
      ageE: '75+',
    };
    return items.filter((item) => item.age === age[selectedAge]);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ageFilter',
})
export class AgeFilterPipe implements PipeTransform {
  transform(items: any[], selectedAge: string) {
    const age = {
      0: 'tous',
      9: '0-9',
      19: '10-19',
      29: '20-29',
      39: '30-39',
      49: '40-49',
      59: '50-59',
      69: '60-69',
      79: '70-79',
      89: '80-89',
      90: '90+'
    };
    return items.filter((item) => item.age === age[selectedAge]);
  }
}

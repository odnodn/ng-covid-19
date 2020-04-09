import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'include',
})
export class IncludePipe implements PipeTransform {
  transform(str: string, value: string) {
    return (str.includes(value));
  }
}

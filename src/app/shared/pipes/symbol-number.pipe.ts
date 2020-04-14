import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'symbolNumber'})
export class SymbolNumberPipe implements PipeTransform {
  transform(value: number, type?: string): string {
    if (value !== undefined && value !== null) {
      if (value > 0) {
        return `+${value}`;
      }
      if (value === 0) {
        if (type === 'mainStats') {
          return '+0';
        }
        return '';
      }
      return value.toString();
    }
    return null;
  }
}

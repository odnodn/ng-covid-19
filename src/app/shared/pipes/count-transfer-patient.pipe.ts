import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countTransferPatient',
})
export class CountTransferPatientPipe implements PipeTransform {
  transform(data: any): any {
    return data.reduce((resultTransfer, obj) => obj.numberPatients + resultTransfer, 0);
  }
}

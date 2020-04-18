import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent {

  @Input() mainStats;
  @Input() selectedCountry;
  @Input() selectedZone;
  @Input() lastUpdate;

  constructor(public readonly router: Router, private datePipe: DatePipe) {
    // @ts-ignore
    twttr.widgets.load();
  }

  getTwittText(): string {
    if (this.selectedZone) {
      return `Au ${this.datePipe.transform(this.mainStats.total.hospital.lastUpdate, 'd MMMM', 'fr-FR')}, ` +
      `${this.selectedZone} ${this.mainStats.total.hospital.translation} ` +
      `recense ${this.mainStats.total.hospital.hospital} ` +
      `hospitalisations en cours pour cause de #COVID_19 dont ${this.mainStats.total.hospital.reanimation} en réanimation. ` +
      `${this.mainStats.total.hospital.deaths} patients sont décédés et ${this.mainStats.total.hospital.recovered} sont ` +
      `retournés à leur domicile depuis le début de l'épidémie.`;
    }
    return `Au ${this.datePipe.transform(this.mainStats.total.global.lastUpdate, 'd MMMM', 'fr-FR')},  ` +
    `la ${this.selectedCountry.translation} recense ${this.mainStats.total.hospital.hospital} ` +
    `hospitalisations en cours pour cause de #COVID_19 dont ${this.mainStats.total.hospital.reanimation} en réanimation. ` +
    `Après hospitalisation, ${this.mainStats.total.hospital.recovered} personnes sont de retour à domicile. ` +
    `On compte ${this.mainStats.total.global.deaths} décès au total depuis le début de l'épidémie.`;
  }
}

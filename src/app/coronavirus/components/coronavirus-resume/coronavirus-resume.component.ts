import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coronavirus-resume',
  templateUrl: './coronavirus-resume.component.html',
  styleUrls: ['./coronavirus-resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusResumeComponent implements OnInit, AfterViewInit {

  @Input() mainStats;
  @Input() selectedZone;
  @Input() selectedCountry;
  constructor(private readonly datePipe: DatePipe, public router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }

  getTwittText(): string {
    if (this.selectedZone) {
      return `Au ${this.datePipe.transform(this.mainStats.total.hospital.lastUpdate, 'd MMMM', 'fr-FR')}, ` +
      `${this.selectedZone} ${this.mainStats.total.hospital.translation} ` +
      `recense ${this.mainStats.total.hospital.hospital} ` +
      `hospitalisations en cours pour cause de #COVID19 dont ${this.mainStats.total.hospital.reanimation} en réanimation. ` +
      `${this.mainStats.total.hospital.deaths} patients sont décédés et ${this.mainStats.total.hospital.recovered} sont ` +
      `retournés à leur domicile depuis le début de l'épidémie.`;
    }
    return `Au ${this.datePipe.transform(this.mainStats.total.global.lastUpdate, 'd MMMM', 'fr-FR')},  ` +
    `la ${this.selectedCountry.translation} recense ${this.mainStats.total.hospital.hospital} ` +
    `hospitalisations en cours pour cause de #COVID19 dont ${this.mainStats.total.hospital.reanimation} en réanimation. ` +
    `Après hospitalisation, ${this.mainStats.total.hospital.recovered} personnes sont de retour à domicile. ` +
    `On compte ${this.mainStats.total.global.deaths} décès au total depuis le début de l'épidémie. `;
  }

}

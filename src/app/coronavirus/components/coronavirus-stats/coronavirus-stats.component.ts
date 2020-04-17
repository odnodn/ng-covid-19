import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent implements Af {

  @Input() mainStats;
  @Input() selectedCountry;
  @Input() selectedZone;
  @Input() lastUpdate;

  constructor(public readonly router: Router) {

  }

  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }
}

import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
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

  constructor() {}
}

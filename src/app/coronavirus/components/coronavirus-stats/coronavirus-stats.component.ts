import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent implements OnInit {

  @Input() mainStats;
  @Input() franceStats;
  @Input() selectedCountry;
  @Input() selectedRegion;
  @Input() selectedDepartment;
  @Input() lastUpdate;

  constructor() {
  }

  ngOnInit(): void {
  }
}

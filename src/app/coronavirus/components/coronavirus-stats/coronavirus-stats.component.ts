import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent {

  @Input() mainStats;
  @Input() franceStats;
  @Input() selectedCountry;
  @Input() selectedZone;
  @Input() lastUpdate;

}

import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';

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
  @Output() readonly updateMapEvent: EventEmitter<string> = new EventEmitter<string>(true);

  constructor() {
  }

  ngOnInit(): void {
  }

  updateMap(type: string): void {
    if (this.selectedCountry.country === 'France' && type === 'cases') {
      return ;
    }
    this.updateMapEvent.emit(type);
  }
}

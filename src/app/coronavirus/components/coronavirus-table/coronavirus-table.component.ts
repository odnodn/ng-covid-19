import { CoronavirusFranceService } from './../../services/coronavirus-france.service';
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coronavirus-table',
  templateUrl: './coronavirus-table.component.html',
  styleUrls: ['./coronavirus-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusTableComponent implements OnInit {

  @Input() detailedStats;
  @Input() selectedCountry;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(private readonly coronavirusFranceService: CoronavirusFranceService) {
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  private initDataTable(): void {
    let detailedStats = this.detailedStats;
    if (this.selectedCountry.country === 'Monde') {
      this.displayedColumns = ['translation', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered'];
    } else if (this.selectedCountry.country === 'France') {
      this.displayedColumns = ['region', 'hospital', 'reanimation', 'deaths', 'recovered'];
      detailedStats = this.coronavirusFranceService.getDataByRegion(this.detailedStats);
    } else {
      this.displayedColumns = ['translation', 'cases', 'deaths', 'recovered'];
    }
    this.dataSource = new MatTableDataSource(detailedStats);
    this.dataSource.sort = this.sort;
  }

}

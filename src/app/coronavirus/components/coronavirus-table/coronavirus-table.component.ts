import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coronavirus-table',
  templateUrl: './coronavirus-table.component.html',
  styleUrls: ['./coronavirus-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusTableComponent implements OnInit, OnChanges {

  @Input() detailedStats;
  @Input() selectedCountry;
  @Input() selectedDivisionMap;
  @Input() selectedTypeMap;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [];
  dataSource: any;
  matSortActive: string;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.initDataTable();
    this.dataSource = new MatTableDataSource(this.detailedStats);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
        return (currentTerm + (data as { [key: string]: any })[key] + '◬');
      }, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const transformedFilter = filter.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private initDataTable(): void {
    const age = {
      ageAll: 'à tous les âges',
      ageA: 'chez les moins de 15 ans',
      ageB: 'chez les 15-44 ans',
      ageC: 'chez les 45-64 ans',
      ageD: 'chez les 65-74 ans',
      ageE: 'chez les plus de 75 ans',
    };
    if (this.selectedTypeMap === 'passage') {
      this.displayedColumns = ['translation', 'passageCorona', 'hospitalCorona', 'acteCorona'];
      this.matSortActive = 'passageCorona';
      return ;
    }

    if (age[this.selectedTypeMap]) {
      this.displayedColumns = ['translation', 'testTotal', 'testTotalPositive', 'testTotalPositiveRate', 'testMenPositiveRate', 'testWomenPositiveRate'];
      this.matSortActive = 'testTotalPositive';
      return ;
    }
    if (this.selectedCountry.country === 'Monde') {
      this.displayedColumns = ['translation', 'cases', 'todayCases', 'active', 'critical', 'deaths', 'todayDeaths', 'recovered'];
      this.matSortActive = 'cases';
    } else if (this.selectedCountry.country === 'France') {
      this.displayedColumns = ['translation', 'hospital', 'hospitalStart',
       'reanimation', 'reanimationStart', 'deaths', 'deathRate', 'recovered', 'recoveredRate'];
      this.matSortActive = 'deathRate';
    } else {
      this.matSortActive = 'cases';
      this.displayedColumns = ['translation', 'cases', 'active', 'deaths', 'recovered'];
    }
  }

}

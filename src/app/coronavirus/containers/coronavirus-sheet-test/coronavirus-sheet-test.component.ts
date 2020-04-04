import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Observable } from 'rxjs';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { ActivatedRoute } from '@angular/router';
import { FRANCE_REGIONS, FRANCE_DEPS } from '@coronavirus/constants/france.constants';

@Component({
  selector: 'app-coronavirus-sheet-test',
  templateUrl: './coronavirus-sheet-test.component.html',
  styleUrls: ['./coronavirus-sheet-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusSheetTestComponent implements OnInit {

  dataTest$: Observable<any>;
  selectedDivisionMap = 'regionFrance';
  selectedCountry: any = COUNTRIES[1];
  selectedDepartment: any;
  selectedRegion: any;

  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.country) {
        return;
      }
      if (params.department) {
        this.selectedDepartment = FRANCE_DEPS.find((department) => department.slug === params.department);
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('department', this.selectedDepartment.code);
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('region', this.selectedRegion.code);
      } else {
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('national');
      }
      this.ref.detectChanges();
    });

  }

}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';

@Component({
  selector: 'app-coronavirus-mortality',
  templateUrl: './coronavirus-mortality.component.html',
  styleUrls: ['./coronavirus-mortality.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMortalityComponent implements OnInit {

  data$: Observable<any>;
  isBrowser = isPlatformBrowser(this.platformId);
  selectedCountry: any = COUNTRIES[0];
  selectedDepartment: any;
  selectedRegion: any;

  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly ref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    this.data$ = this.coronavirusFranceService.getFranceMortality('national');
    this.route.params.subscribe(params => {
      if (!params.country) { /* No param route */
      }
      if (params.country) {
        this.selectedCountry = COUNTRIES.find((country) => country.slug === params.country);
        if (!this.selectedCountry) {
          this.selectedCountry = COUNTRIES.find((country) => country.slug === 'france');
          this.router.navigateByUrl('/');
          return;
        }
      }
      this.ref.detectChanges();
    });
  }

}

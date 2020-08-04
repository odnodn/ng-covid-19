import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { isPlatformBrowser } from '@angular/common';
import { FRANCE_DEPS, FRANCE_REGIONS } from '@coronavirus/constants/france.constants';

@Component({
  selector: 'app-coronavirus-sheet-epidemic',
  templateUrl: './coronavirus-sheet-epidemic.component.html',
  styleUrls: ['./coronavirus-sheet-epidemic.component.scss']
})
export class CoronavirusSheetEpidemicComponent implements OnInit {

  epidemicMeasures$: Observable<any>;
  selectedDivisionMap = 'departmentFrance';
  selectedCountry: any = COUNTRIES[0];
  selectedDepartment: any;
  selectedRegion: any;
  selectedTypeMap = 'indicateur';

  // selectedDivisionMapTable = 'departmentFrance';
  // type = 'passage';
  isBrowser = isPlatformBrowser(this.platformId);
  selectedZone: string;
  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.country) {
        return;
      }
      if (params.department) {
        this.selectedDepartment = FRANCE_DEPS.find((department) => department.slug === params.department);
        this.selectedZone = 'le département';
        if (!this.selectedDepartment) {
          this.router.navigateByUrl('/');
          return;
        }
        this.epidemicMeasures$ = this.coronavirusFranceService.getFranceEpidemicMeasure('department', this.selectedDepartment.code);
        this.initMetaTagRegionAndDepartment(this.selectedDepartment, 'departement', 'le département');
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        this.selectedZone = 'la région';
        if (!this.selectedRegion) {
          this.router.navigateByUrl('/');
          return;
        }
        this.epidemicMeasures$ = this.coronavirusFranceService.getFranceEpidemicMeasure('region', this.selectedRegion.code);
        this.initMetaTagRegionAndDepartment(this.selectedRegion, 'region', 'la région');
      } else {
        this.epidemicMeasures$ = this.coronavirusFranceService.getFranceEpidemicMeasure('national');
        // this.initMetaTagFrance();
      }
      this.ref.detectChanges();
    });
  }

  private initMetaTagRegionAndDepartment(region: any, urlType: string, type: string): void {
    this.title.setTitle(`Indicateurs de suivi de l'épidémie de Coronavirus COVID-19 ${region.name}`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Suivez l'évolution de l'épidémie dans ${type} ${region.name} : R0, taux d'incidence, taux de positivité des tests, taux d'occupation des lits en réanimation` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/indicateurs-suivi-epidemie//france/${urlType}/${region.slug}` },
      { property: 'og:title', content: `Indicateurs de suivi de l'épidémie de Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Suivez l'évolution de l'épidémie dans ${type} ${region.name} : R0, taux d'incidence, taux de positivité des tests, taux d'occupation des lits en réanimation` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Indicateurs de suivi de l'épidémie de Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Suivez l'évolution de l'épidémie dans ${type} ${region.name} : R0, taux d'incidence, taux de positivité des tests, taux d'occupation des lits en réanimation` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

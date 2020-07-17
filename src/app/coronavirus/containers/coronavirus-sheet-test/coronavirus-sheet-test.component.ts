import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Observable } from 'rxjs';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FRANCE_REGIONS, FRANCE_DEPS } from '@coronavirus/constants/france.constants';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coronavirus-sheet-test',
  templateUrl: './coronavirus-sheet-test.component.html',
  styleUrls: ['./coronavirus-sheet-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusSheetTestComponent implements OnInit {

  dataTest$: Observable<any>;
  selectedDivisionMap = 'departmentFrance';
  selectedCountry: any = COUNTRIES[0];
  selectedDepartment: any;
  selectedRegion: any;
  selectedTypeMap = '0';
  selectedDivisionMapTable = 'departmentFrance';
  labelTableAge = 'à tous âges';
  isBrowser = isPlatformBrowser(this.platformId);
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
        if (!this.selectedDepartment) {
          this.router.navigateByUrl('/');
          return;
        }
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('department', this.selectedDepartment.code);
        this.initMetaTagRegionAndDepartment(this.selectedDepartment, 'departement', 'le département');
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        if (!this.selectedRegion) {
          this.router.navigateByUrl('/');
          return;
        }
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('region', this.selectedRegion.code);
        this.initMetaTagRegionAndDepartment(this.selectedRegion, 'region', 'la région');
      } else {
        this.dataTest$ = this.coronavirusFranceService.getFranceDataTest('national');
        this.initMetaTagFrance();
      }
      this.ref.detectChanges();
    });
  }

  onSelectTypeMap(type: string): void {
    const age = {
      0: 'tous',
      9: '0-9',
      19: '10-19',
      29: '20-29',
      39: '30-39',
      49: '40-49',
      59: '50-59',
      69: '60-69',
      79: '70-79',
      89: '80-89',
      90: '90+'
    };
    this.selectedTypeMap = type;
    this.labelTableAge = age[type];
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;
    this.selectedDepartment = undefined;
    this.router.navigate(['test-depistage', this.selectedCountry.slug]);
  }

  private initMetaTagRegionAndDepartment(region: any, urlType: string, type: string): void {
    this.title.setTitle(`Tests de dépistage Coronavirus COVID-19 ${region.name}`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Tests de dépistage Coronavirus COVID-19 ${region.name} - Suivez les tests de dépistage pour diagnostic de COVID-19 dans ${type} ${region.name}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: `https://www.cascoronavirus.fr/` },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/test-depistage/france/${urlType}/${region.slug}` },
      { property: 'og:title', content: `Tests de dépistage Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Tests de dépistage Coronavirus COVID-19 ${region.name} - Suivez les tests de dépistage pour diagnostic de COVID-19 dans ${type} ${region.name}` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Tests de dépistage Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Tests de dépistage Coronavirus COVID-19 ${region.name} - Suivez les tests de dépistage pour diagnostic de COVID-19 dans ${type} ${region.name}` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagFrance(): void {
    this.title.setTitle(`Tests de dépistage Coronavirus COVID-19 France`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/test-depistage/${this.selectedCountry.slug}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:title', content: `Tests de dépistage Coronavirus COVID-19 France` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:title', content: `Tests de dépistage Coronavirus COVID-19 France` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Tests de dépistage Coronavirus COVID-19 France - Suivez les tests de dépistage pour diagnostic de COVID-19 en France par région et département` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

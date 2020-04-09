import { FRANCE_REGIONS, FRANCE_DEPS } from '@coronavirus/constants/france.constants';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { DetailedStat } from '@coronavirus/models/coronavirus.models';
import { isPlatformBrowser } from '@angular/common';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CoronavirusFranceAgeService } from '@coronavirus/services/coronavirus-france-age.service';

@Component({
  selector: 'app-coronavirus-sheet',
  templateUrl: './coronavirus-sheet.component.html',
  styleUrls: ['./coronavirus-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusSheetComponent implements OnInit {

  data$: Observable<any>;
  dailyDatasByCountry$: Observable<any>;
  tableStatsByCountry$: Observable<DetailedStat>;
  detailedStats$: Observable<DetailedStat>;

  franceStats$: Observable<any>;
  franceStatsByAge$: Observable<any>;

  selectedCountry: any = COUNTRIES[0];
  selectedDivisionMap = 'departmentFrance';
  selectedRegion: any;
  selectedDepartment: any;
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly coronavirusFranceAgeService: CoronavirusFranceAgeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly ref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
  }

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.route.params.subscribe(params => {
      if (!params.country) { /* No param route */
        this.updateFranceNationalDatas();
      }
      if (params.country) {
        this.selectedCountry = COUNTRIES.find((country) => country.slug === params.country);
        if (!this.selectedCountry) {
          this.router.navigateByUrl('/');
          return;
        }
        if (this.selectedCountry.country === 'Monde') {
          this.initWorldDatas();
          this.initMetaTagWorld();
        } else if (this.selectedCountry.country === 'France') {
          this.updateFranceDatas(params);
        } else {
          this.initCountryDatas();
          this.initMetaTagCountry();
        }
      }
      this.ref.detectChanges();
    });
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;
    this.selectedDepartment = undefined;
    this.router.navigate(['stats', this.selectedCountry.slug]);
  }

  private updateFranceDatas(params: any): void {
    if (params.region) {
      this.updateFranceRegionDatas(params);
    } else if (params.department) {
      this.updateFranceDepartmentDatas(params);
    } else {
      this.updateFranceNationalDatas();
    }
  }

  private updateFranceNationalDatas(): void {
    this.initMetaTagCountry();
    this.franceStatsByAge$ = this.coronavirusFranceAgeService.getFranceDataByAge('national');
    this.franceStats$ = this.coronavirusFranceService.getData('national');
  }

  private updateFranceRegionDatas(params: any): void {
    this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
    if (!this.selectedRegion) {
      this.router.navigateByUrl('/');
      return;
    }
    this.initMetaTagRegionAndDepartment(this.selectedRegion, 'la région');
    this.franceStatsByAge$ = this.coronavirusFranceAgeService.getFranceDataByAge('region', this.selectedRegion.code);
    this.franceStats$ = this.coronavirusFranceService.getData('region', this.selectedRegion.code);
  }

  private updateFranceDepartmentDatas(params: any): void {
    this.selectedDepartment = FRANCE_DEPS.find((department) => department.slug === params.department);
    if (!this.selectedDepartment) {
      this.router.navigateByUrl('/');
      return;
    }
    this.initMetaTagRegionAndDepartment(this.selectedDepartment, 'le département');
    this.franceStatsByAge$ = this.coronavirusFranceAgeService.getFranceDataByAge('department', this.selectedDepartment.code);
    this.franceStats$ = this.coronavirusFranceService.getData('department', this.selectedDepartment.code);
  }

  private initMetaTagWorld(): void {
    this.title.setTitle('Cas Coronavirus - suivez le COVID-19 en France et dans le monde');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées et une carte en temps réel' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:title', content: 'Cas Coronavirus - suivez le COVID-19 en France et dans le monde' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées et une carte en temps réel' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Cas de Coronavirus : suivez les cas du COVID-19 en France et dans le monde' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées et une carte en temps réel' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagCountry(): void {
    this.title.setTitle(`Cas Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Cas de Coronavirus COVID-19 ${this.selectedCountry.translation} - Suivez les cas et morts du virus avec des statistiques détaillées en temps réel` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/stats/${this.selectedCountry.slug}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:title', content: `Cas Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Suivez les cas et morts du Coronavirus COVID-19 en ${this.selectedCountry.translation} avec des graphs et statistiques détaillées` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:title', content: `Cas Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Suivez les cas et morts du Coronavirus COVID-19 en ${this.selectedCountry.translation} avec des graphs et statistiques détaillées` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagRegionAndDepartment(region: any, type: string): void {
    this.title.setTitle(`Cas Coronavirus ${region.name} - suivez le COVID-19 en ${region.name}`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Cas de Coronavirus COVID-19 ${region.name} - Suivez les cas et morts du virus avec des statistiques détaillées en temps réel dans ${type} ${region.name}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/stats/${region.slug}` },
      { property: 'og:title', content: `Cas Coronavirus ${region.name} - suivez le COVID-19 en ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Cas de Coronavirus COVID-19 ${region.name} - Suivez les cas et morts du virus avec des statistiques détaillées en temps réel dans ${type} ${region.name}` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Cas Coronavirus ${region.name} - suivez le COVID-19 en ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Cas de Coronavirus COVID-19 ${region.name} - Suivez les cas et morts du virus avec des statistiques détaillées en temps réel dans ${type} ${region.name}` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initWorldDatas(): void {

    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
  }



  private initCountryDatas(): void {

    /* Graph page footer */
    this.dailyDatasByCountry$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.code);

    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();

    /* Table page country */
    if (this.selectedCountry.country === 'US') {
      this.tableStatsByCountry$ = this.coronavirusService.getUsaDatas();
      return;
    }
    this.tableStatsByCountry$ = this.coronavirusService.getDetailedStatsByCountries(this.selectedCountry.code);
  }

}

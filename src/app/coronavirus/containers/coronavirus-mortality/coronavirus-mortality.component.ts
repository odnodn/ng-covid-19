import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { WEEK_NUMBERS } from '@coronavirus/constants/week-numbers.constants';

@Component({
  selector: 'app-coronavirus-mortality',
  templateUrl: './coronavirus-mortality.component.html',
  styleUrls: ['./coronavirus-mortality.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMortalityComponent implements OnInit {

  data: any;
  isBrowser = isPlatformBrowser(this.platformId);
  selectedCountry: any = COUNTRIES[0];
  selectedDepartment: any;
  selectedRegion: any;
  selectedDate: any;
  selectedDivisionMap = 'departmentFrance';
  weekNumbers = WEEK_NUMBERS;
  age = {
    tous: 'à tous âges',
    '65+': 'chez les plus de 65 ans',
  };
  selectedAge = 'tous';

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
    this.initDatas();
    this.initMetaTag();
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

  private initDatas(): void {
    this.coronavirusFranceService.getFranceMortality('national').subscribe((result) => {
      this.data = result;
      this.selectedDate = result.dates[result.dates.length - 1];
      this.ref.detectChanges();
    });
  }

  dateChange($event): void {
    this.selectedDate = $event;
  }

  selectDivisionChange($event): void {
    this.selectedDivisionMap = $event;
    this.ref.detectChanges();
  }

  onSelectAge(): void {
    this.ref.detectChanges();
  }

  private initMetaTag(): void {
    this.title.setTitle('Carte du niveau d\'excès de mortalité pendant l\'épidémie de Coronavirus COVID-19');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Coronavirus COVID-19 : Carte du niveau d\'excès de mortalité pendant l\'épidémie par département' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/carte-exces-mortalite/france' },
      { property: 'og:title', content: 'Carte du niveau d\'excès de mortalité pendant l\'épidémie de Coronavirus COVID-19' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Coronavirus COVID-19 : Carte du niveau d\'excès de mortalité pendant l\'épidémie par département' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Carte du niveau d\'excès de mortalité pendant l\'épidémie de Coronavirus COVID-19' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Coronavirus COVID-19 : Carte du niveau d\'excès de mortalité pendant l\'épidémie par département' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

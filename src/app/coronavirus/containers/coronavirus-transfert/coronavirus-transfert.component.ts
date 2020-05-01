import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FRANCE_DEPS, FRANCE_REGIONS } from '@coronavirus/constants/france.constants';
import { Observable } from 'rxjs';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';

@Component({
  selector: 'app-coronavirus-transfert',
  templateUrl: './coronavirus-transfert.component.html',
  styleUrls: ['./coronavirus-transfert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusTransfertComponent implements OnInit {
  startRegion: any;
  endRegion: any;
  selectedSortFilter: string;
  sortFilters: string[] = [
    'Le plus grand nombre de patients transférés',
    'Date de début de transfert le plus récent',
    'Date de fin de transfert le plus récent'
  ];
  dataTransfert$: Observable<any>;
  selectedDepartment: any;
  selectedRegion: any;
  selectedCountry: any = COUNTRIES[0];
  filteredRegions: any[] = FRANCE_REGIONS;
  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
  ) { }

  ngOnInit(): void {
    this.selectedSortFilter = 'Date de fin de transfert le plus récent';
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
        this.dataTransfert$ = this.coronavirusFranceService.getFranceDataTransfert();
        this.initMetaTagFrance();
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        if (!this.selectedRegion) {
          this.router.navigateByUrl('/');
          return;
        }
        this.dataTransfert$ = this.coronavirusFranceService.getFranceDataTransfert();
        this.initMetaTagFrance();
      } else {
        this.dataTransfert$ = this.coronavirusFranceService.getFranceDataTransfert();
        this.initMetaTagFrance();
      }
      this.ref.detectChanges();
    });
  }

  filterRegions(value: string) {
    let search = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!search) {
      this.filteredRegions = FRANCE_REGIONS;
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredRegions = FRANCE_REGIONS.filter(region => (region.name.toLowerCase())
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .indexOf(search) > -1);
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;
    this.selectedDepartment = undefined;
    this.router.navigate(['transfert-patients', this.selectedCountry.slug]);
  }

  clearEndRegion(): void {
    this.endRegion = null;
  }

  clearStartRegion(): void {
    this.startRegion = null;
  }

  private initMetaTagFrance(): void {
    this.title.setTitle(`Transferts de patients atteints de Coronavirus COVID-19 en France`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Suivez les transferts de patients atteints de Coronavirus COVID-19 entre les régions et les départements` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/transfert-patients/france` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:title', content: `Transferts de patients atteints de Coronavirus COVID-19` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Suivez les transferts de patients atteints de Coronavirus COVID-19 entre les régions et les départements` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:title', content: `Transferts de patients atteints de Coronavirus COVID-19` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Suivez les transferts de patients atteints de Coronavirus COVID-19 entre les régions et les départements` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

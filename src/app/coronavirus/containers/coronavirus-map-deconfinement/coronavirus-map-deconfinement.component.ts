import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { ActivatedRoute, Router } from '@angular/router';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { FRANCE_DEPS, FRANCE_REGIONS } from '@coronavirus/constants/france.constants';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coronavirus-map-deconfinement',
  templateUrl: './coronavirus-map-deconfinement.component.html',
  styleUrls: ['./coronavirus-map-deconfinement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapDeconfinementComponent implements OnInit {

  data: any;
  selectedDepartment: any;
  selectedRegion: any;
  selectedCountry: any = COUNTRIES[0];
  selectedDate;
  greenDepartments: any[];
  redDepartments: any[];
  orangeDepartments: any[];
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {

  }

  ngOnInit(): void {
    this.getData();
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
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        if (!this.selectedRegion) {
          this.router.navigateByUrl('/');
          return;
        }
      }
      this.ref.detectChanges();
    });
  }

  dateChange($event): void {
    this.coronavirusFranceService.getDeconfinement($event).subscribe((result) => {
      this.greenDepartments = result.map.filter((item) => item.color === 'vert');
      this.orangeDepartments = result.map.filter((item) => item.color === 'orange');
      this.redDepartments = result.map.filter((item) => item.color === 'rouge');
      this.selectedDate = result.images.date;
      this.data = result;
      this.ref.detectChanges();
    });
  }

  private getData(): void {
    this.coronavirusFranceService.getDeconfinement().subscribe((result) => {
      this.greenDepartments = result.map.filter((item) => item.color === 'vert');
      this.orangeDepartments = result.map.filter((item) => item.color === 'orange');
      this.redDepartments = result.map.filter((item) => item.color === 'rouge');
      this.selectedDate = result.images.date;
      this.data = result;
      this.ref.detectChanges();
    });
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle('Coronavirus COVID-19 : Carte de France du déconfinement par département');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Coronavirus COVID-19 : suivez la carte de France du déconfinement par département' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/carte-deconfinement/france' },
      { property: 'og:title', content: 'Coronavirus COVID-19 : Carte de France du déconfinement par département' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Coronavirus COVID-19 : suivez la carte de France du déconfinement par département' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Coronavirus COVID-19 : Carte de France du déconfinement par département' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Coronavirus COVID-19 : suivez la carte de France du déconfinement par département' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }
}

import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { FRANCE_DEPS, FRANCE_REGIONS } from '@coronavirus/constants/france.constants';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coronavirus-sheet-emergency',
  templateUrl: './coronavirus-sheet-emergency.component.html',
  styleUrls: ['./coronavirus-sheet-emergency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusSheetEmergencyComponent implements OnInit {

  dataEmergency$: Observable<any>;
  selectedDivisionMap = 'departmentFrance';
  selectedCountry: any = COUNTRIES[0];
  selectedDepartment: any;
  selectedRegion: any;
  selectedTypeMap = 'passage';
  selectedDivisionMapTable = 'departmentFrance';
  type = 'passage';
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
        this.dataEmergency$ = this.coronavirusFranceService.getFranceDataEmergency('department', this.selectedDepartment.code);
        this.initMetaTagRegionAndDepartment(this.selectedDepartment, 'departement', 'le département');
      } else if (params.region) {
        this.selectedRegion = FRANCE_REGIONS.find((region) => region.slug === params.region);
        if (!this.selectedRegion) {
          this.router.navigateByUrl('/');
          return;
        }
        this.dataEmergency$ = this.coronavirusFranceService.getFranceDataEmergency('region', this.selectedRegion.code);
        this.initMetaTagRegionAndDepartment(this.selectedRegion, 'region', 'la région');
      } else {
        this.dataEmergency$ = this.coronavirusFranceService.getFranceDataEmergency('national');
        this.initMetaTagFrance();
      }
      this.ref.detectChanges();
    });
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;
    this.selectedDepartment = undefined;
    this.router.navigate(['urgences', this.selectedCountry.slug]);
  }

  displayTab(type: string): void {
    this.type = type;
    window.scrollBy(0, 1);
  }


  private initMetaTagRegionAndDepartment(region: any, urlType: string, type: string): void {
    this.title.setTitle(`Urgences Hospitalières Coronavirus COVID-19 ${region.name}`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Statstiques sur les urgences hospitalières et actes médicaux Coronavirus COVID-19 ${region.name} - Suivez les urgences hospitalières et actes médicaux Coronavirus dans ${type} ${region.name}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/urgences/france/${urlType}/${region.slug}` },
      { property: 'og:title', content: `Urgences Hospitalières Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Statstiques sur les urgences hospitalières et actes médicaux Coronavirus COVID-19 ${region.name} - Suivez les urgences hospitalières et actes médicaux Coronavirus dans ${type} ${region.name}` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Urgences Hospitalières Coronavirus COVID-19 ${region.name}` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Statstiques sur les urgences hospitalières et actes médicaux Coronavirus COVID-19 ${region.name} - Suivez les urgences hospitalières et actes médicaux Coronavirus dans ${type} ${region.name}` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagFrance(): void {
    this.title.setTitle(`Urgences Hospitalières Coronavirus COVID-19 en France`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Statstiques sur les urgences hospitalières et actes médicaux Coronavirus COVID-19 en France par région et département` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/urgences/${this.selectedCountry.slug}` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:title', content: `Urgences Hospitalières Coronavirus COVID-19 en France` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Statstiques sur les urgences hospitalières et actes médicaux Coronavirus COVID-19 en France par région et département` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:title', content: `Urgences Hospitalières Coronavirus COVID-19 en France` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Statstiques sur les urgences hospitalières et actes médicaux Coronavirus COVID-19 en France par région et département` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

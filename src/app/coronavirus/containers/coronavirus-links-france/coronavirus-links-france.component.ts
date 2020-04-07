import { FRANCE_REGIONS, FRANCE_DEPS } from '@coronavirus/constants/france.constants';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-links-france',
  templateUrl: './coronavirus-links-france.component.html',
  styleUrls: ['./coronavirus-links-france.component.css']
})
export class CoronavirusLinksFranceComponent implements OnInit {

  regions: any[] = FRANCE_REGIONS;
  departments: any[] = FRANCE_DEPS;

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle('Cas Coronavirus - suivez le COVID-19 en France par région et par département');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France par région et département' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: 'https://www.cascoronavirus.fr/stats/liens/france' },
      { name: 'og:title', content: 'Cas Coronavirus - suivez le COVID-19 en France et dans le monde' },
      // tslint:disable-next-line:max-line-length
      { name: 'og:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France par région et département' },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Cas de Coronavirus : suivez les cas du COVID-19 en France et dans le monde' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France par région et département' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }


}

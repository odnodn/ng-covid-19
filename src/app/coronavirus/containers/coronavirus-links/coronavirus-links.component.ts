import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-links',
  templateUrl: './coronavirus-links.component.html',
  styleUrls: ['./coronavirus-links.component.scss']
})
export class CoronavirusLinksComponent implements OnInit {

  countries: any[] = COUNTRIES;
  constructor(
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle('Cas Coronavirus - suivez le COVID-19 en France et dans le monde');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées en temps réel' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:title', content: 'Cas Coronavirus - suivez le COVID-19 en France et dans le monde' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées en temps réel' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Cas de Coronavirus : suivez les cas du COVID-19 en France et dans le monde' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées en temps réel' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }



}

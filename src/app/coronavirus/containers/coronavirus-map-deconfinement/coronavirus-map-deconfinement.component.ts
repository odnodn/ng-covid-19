import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-map-deconfinement',
  templateUrl: './coronavirus-map-deconfinement.component.html',
  styleUrls: ['./coronavirus-map-deconfinement.component.scss']
})
export class CoronavirusMapDeconfinementComponent implements OnInit {

  constructor(
    private readonly title: Title,
    private readonly meta: Meta
  ) {
    this.initMetaTag();
  }

  ngOnInit(): void {

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

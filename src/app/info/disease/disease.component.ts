import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Coronavirus COVID-19 : informations, symptômes, conseils');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Retrouvez les informations du Coronavirus COVID-19 : symptômes, conseils, vaccins, confinement, transmission, maladie' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/infos/maladie-coronavirus' },
      { property: 'og:title', content: 'Coronavirus COVID-19 : informations, symptômes, conseils' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Retrouvez les informations du Coronavirus COVID-19 : symptômes, conseils, vaccins, confinement, transmission, maladie' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Coronavirus COVID-19 : informations, symptômes, conseils' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Retrouvez les informations du Coronavirus COVID-19 : symptômes, conseils, vaccins, confinement, transmission, maladie' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@cascoronavirus' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

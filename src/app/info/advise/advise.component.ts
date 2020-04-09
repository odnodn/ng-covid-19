import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-advise',
  templateUrl: './advise.component.html',
  styleUrls: ['./advise.component.scss']
})
export class AdviseComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Coronavirus COVID-19 : conseils et informations');
    const tags = [
      { name: 'description', content: 'Retrouvez tous les conseils pour se protéger contrer le Coronavirus COVID-19' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/infos/conseils' },
      { property: 'og:title', content: 'Coronavirus COVID-19 : informations, symptômes, conseils' },
      { property: 'og:description', content: 'Retrouvez tous les conseils pour se protéger contrer le Coronavirus COVID-19' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Coronavirus COVID-19 : informations, symptômes, conseils' },
      { name: 'twitter:description', content: 'Retrouvez tous les conseils pour se protéger contrer le Coronavirus COVID-19' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

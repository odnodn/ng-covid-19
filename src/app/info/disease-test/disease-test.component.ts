import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-disease-test',
  templateUrl: './disease-test.component.html',
  styleUrls: ['./disease-test.component.scss']
})
export class DiseaseTestComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Faites un test de symptômes du Coronavirus COVID-19');
    const tags = [
      { name: 'description', content: 'Faites un test pour savoir si vous avez les symptômes et la maladie du Coronavirus COVID-19' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/infos/maladie-test-coronavirus' },
      { property: 'og:title', content: 'Faites un test de symptômes du Coronavirus COVID-19' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Faites un test pour savoir si vous avez les symptômes et la maladie du Coronavirus COVID-19' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Faites un test de symptômes du Coronavirus COVID-19' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Faites un test pour savoir si vous avez les symptômes et la maladie du Coronavirus COVID-19' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@cascoronavirus' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

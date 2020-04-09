import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gouv',
  templateUrl: './gouv.component.html',
  styleUrls: ['./gouv.component.scss']
})
export class GouvComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {
   }

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle('Infos et attestations Coronavirus COVID-19 du gouvernement');
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Retrouver les informations et les attestations de sortie du Gouvernement à cause du Coronavirus COVID-19' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/infos/gouvernement' },
      { property: 'og:title', content: 'Infos et attestations Coronavirus COVID-19 du gouvernement' },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: 'Retrouver les informations et les attestations de sortie du Gouvernement à cause du Coronavirus COVID-19' },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Infos et attestations Coronavirus COVID-19 du gouvernement' },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: 'Retrouver les informations et les attestations de sortie du Gouvernement à cause du Coronavirus COVID-19' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og_social.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}

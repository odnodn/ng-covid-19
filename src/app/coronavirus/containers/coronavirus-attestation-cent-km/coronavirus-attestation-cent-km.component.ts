import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-attestation-cent-km',
  templateUrl: './coronavirus-attestation-cent-km.component.html',
  styleUrls: ['./coronavirus-attestation-cent-km.component.css']
})
export class CoronavirusAttestationCentKmComponent implements OnInit {

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
  ) {
    this.title.setTitle(`Attestation 100 km`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Jusqu'où pouvez-vous aller dans un rayon de 100 km à vol d"oiseau autour votre domicile ?` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/carte-circulation-100-km-deconfinement` },
      { property: 'og:title', content: `Carte de la zone de sortie de 100 km autour du domicile pour le déconfinement` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Jusqu'où pouvez-vous aller dans un rayon de 100 km autour votre domicile ?` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/map_deconfinement_100km.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Carte de la zone de sortie de 100 km autour du domicile pour le déconfinement` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Jusqu'où pouvez-vous aller dans un rayon de 100 km autour votre domicile ?` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/map_deconfinement_100km.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  ngOnInit(): void {
  }

}

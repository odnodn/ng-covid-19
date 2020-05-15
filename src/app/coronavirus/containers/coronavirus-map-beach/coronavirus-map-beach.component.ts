import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coronavirus-map-beach',
  templateUrl: './coronavirus-map-beach.component.html',
  styleUrls: ['./coronavirus-map-beach.component.scss']
})
export class CoronavirusMapBeachComponent implements OnInit {

  isBrowser = isPlatformBrowser(this.platformId);
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
    this.title.setTitle(`Carte des plages ouvertes pour le déconfinement`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Pour le déconfinement relatif au Coronavirus COVID-19 du 11 mai
      (date qui marque la fin du confinement) en France,
      certaines plages vont donc réouvrir à partir du week-end du 16 mai.
      Dans le cadre de ces ouvertures de plages, les préfets ont accordé une dérogation en fonction des demandes des maires.
      Toutefois, il faut bien distinguer la notion de <strong>plage dynamique</strong> et de <strong>plage statique</strong>.
      Les plages seront ouvertes en mode dynamique avec des plages horaires définies. Il sera ainsi possible de marcher, courir, de pratiquer
      un sport individuel.
      Le mode statique ne sera pas autorisé, il sera impossible de poser sa serviette pour des activités de bronzage.` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/carte-ouverture-plage-deconfinement` },
      { property: 'og:title', content: `Carte des plages ouvertes pour le déconfinement` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Visualiser la carte des plages ouvertes pour le déconfinement` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/carte_plage_ouverture.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Carte des plages ouvertes pour le déconfinement` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Visualiser la carte des plages ouvertes pour le déconfinement` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/carte_plage_ouverture.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  ngOnInit(): void {
  }

}

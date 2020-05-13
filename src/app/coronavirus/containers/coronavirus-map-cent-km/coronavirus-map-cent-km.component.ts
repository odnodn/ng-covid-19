import { Component, OnInit, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { URLS_PREFECTURE } from '@coronavirus/constants/urls-prefecture.constants';

declare const require: any;
@Component({
  selector: 'app-coronavirus-map-cent-km',
  templateUrl: './coronavirus-map-cent-km.component.html',
  styleUrls: ['./coronavirus-map-cent-km.component.scss']
})
export class CoronavirusMapCentKmComponent implements OnInit, AfterViewInit {

  map: any;
  isFound = false;
  address: string;
  fullAddress: any;
  isBrowser = isPlatformBrowser(this.platformId);
  L = null;
  @ViewChild('taskForm') myForm: NgForm;
  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
    if (this.isBrowser) {
      this.L = require('leaflet');
    }
    this.title.setTitle(`Carte de la zone de sortie de 100 km à vol d'oiseau autour du domicile pour le déconfinement`);
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

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.findMe();
  }

  onSubmit(): void {
    this.coronavirusFranceService.getMapPosition(this.address).subscribe((result) => {
      if (result.length > 0) {
        this.fullAddress = result[0].address;
        this.initMap(result[0].lat, result[0].lon, false);
      } else {
        this.fullAddress = null;
      }
    });
  }

  findMe() {
    if (this.L) {
      this.map = this.L.map('map', {
        center: [46.227638, 2.213749],
        zoom: 6
      });
      const tiles = this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
      if (navigator.geolocation) {
        this.isFound = true;
        navigator.geolocation.getCurrentPosition((position) => {
          this.coronavirusFranceService.getMapPositionReverse(position.coords.latitude, position.coords.longitude).subscribe((result) => {
            this.fullAddress = result.address;
            this.initMap(position.coords.latitude, position.coords.longitude, false);
          });
        },
          (error) => {
            this.initMapColor();
          });
      } else {
        this.initMapColor();
      }
    }
  }

  initMap(latitude: number, longitude: number, init: boolean): void {
    let latitudePos = 0;
    let longitudePos = 0;

    if (latitude && longitude) {
      latitudePos = latitude;
      longitudePos = longitude;
    }
    if (this.map) {
      this.map.remove();
    }

    if (this.L) {
      this.map = this.L.map('map', {
        center: [latitudePos, longitudePos],
        zoom: init ? 6 : 8
      });

      const tiles = this.L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 16,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
      if (init === false) {
        const circle = this.L.circle([latitude, longitude], {
          color: '#0069cc',
          fillColor: '#0069cc',
          fillOpacity: 0.2,
          dashArray: '6',
          radius: 100000
        }).addTo(this.map);
        const icon = new this.L.Icon.Default();
        icon.options.shadowSize = [0, 0];
        const marker = this.L.marker([latitude, longitude], {icon : icon}).addTo(this.map);
        if (this.fullAddress && this.fullAddress.county) {
          const url = URLS_PREFECTURE.find((urlItem) => urlItem.nomDepartement === this.fullAddress.county);
          if (url) {
            this.fullAddress.urlPrefecture = url.pagePrefecture;
              // tslint:disable-next-line: max-line-length
            marker.bindPopup('<div style="text-align: center">Vous êtes ici ! </br><a href=\'' + this.fullAddress.urlPrefecture + '\' target="_blank" rel="noopener noreferrer">Accéder aux consignes préfectorales</br> de votre département</a></div>').openPopup();
          } else {
            marker.bindPopup('Vous êtes ici !').openPopup();
          }
        } else {
          marker.bindPopup('Vous êtes ici !').openPopup();
        }
      }
      this.initMapColor();
    }
  }

  private initMapColor(): void {
    combineLatest([
      this.coronavirusFranceService.getUseGeojson(),
      this.coronavirusFranceService.getDeconfinement()
    ])
      .subscribe((result) => {
        this.L.geoJSON(result[0], {
          style:
            function styleMap(feature) {
              const colors = {
                orange: '#fb0',
                vert: '#43d787',
                rouge: '#f9461c'
              };
              return {
                color: colors[result[1].map.find((item) => item.code === feature.properties.code).color],
                weight: 3,
                opacity: 1,
                dashArray: '4',
                fillOpacity: 0.3
              };
            }
        }).addTo(this.map);
      });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-coronavirus-map-cent-km',
  templateUrl: './coronavirus-map-cent-km.component.html',
  styleUrls: ['./coronavirus-map-cent-km.component.scss']
})
export class CoronavirusMapCentKmComponent implements OnInit {

  map: any;
  isFound = false;
  address: string;
  fullAddress: any;
  @ViewChild('taskForm') myForm: NgForm;

  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly title: Title,
    private readonly meta: Meta,
    ) {

  }

  ngOnInit() {
    this.findMe();
    this.title.setTitle(`Carte de circulation de 100 km autour du domicile pour le déconfinement lié au Coronavirus COVID-19`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Où pouvez-vous aller à 100 km de votre domicile ?` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/carte-deconfinement-100-km` },
      { property: 'og:title', content: `Carte de circulation de 100 km autour du domicile pour le déconfinement lié au Coronavirus COVID-19` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Où pouvez-vous aller à 100 km de votre domicile ?` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/map_deconfinement_100km.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Carte de circulation de 100 km autour du domicile pour le déconfinement lié au Coronavirus COVID-19` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Où pouvez-vous aller à 100 km de votre domicile ?` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/map_deconfinement_100km.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  onSubmit(): void {
    this.coronavirusFranceService.getMapPosition(this.address).subscribe((result) => {
      if (result.length > 0) {
        this.fullAddress = result[0].address;
        if (this.map) {
          this.map.remove();
        }
        this.initMap(result[0].lat , result[0].lon);
      } else {
        this.fullAddress = null;
      }

    });
  }

  findMe() {
    if (navigator.geolocation) {
      this.isFound = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  initMap(latitude: number, longitude: number): void {

    this.map = L.map('map', {
      center: [latitude, longitude],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const circle = L.circle([latitude, longitude], {
      color: '#0069cc',
      fillColor: '#0069cc',
      fillOpacity: 0.5,
      radius: 100000
    }).addTo(this.map);
    tiles.addTo(this.map);
    const myIcon = L.divIcon({className: 'my-div-icon'});
    const marker = L.marker([latitude, longitude], {icon: myIcon}).addTo(this.map);
    marker.bindPopup('Vous êtes ici !').openPopup();
  }
}

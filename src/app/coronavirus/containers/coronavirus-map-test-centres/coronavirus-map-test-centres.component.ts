import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { FormControl } from '@angular/forms';
import { switchMap, tap, finalize, debounceTime } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

declare const require: any;

@Component({
  selector: 'app-coronavirus-map-test-centres',
  templateUrl: './coronavirus-map-test-centres.component.html',
  styleUrls: ['./coronavirus-map-test-centres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapTestCentresComponent implements OnInit, AfterViewInit {

  map: any;
  L = null;
  icon: any;
  iconCurrentPosition: any;
  isBrowser = isPlatformBrowser(this.platformId);
  testCentres: any[];
  selectedCentre: any = {};
  address: string;
  fullAddress: any;

  searchAdressCtrl = new FormControl();
  addressDatas: any = {};
  isLoading = false;
  errorMsg: string;


  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly ref: ChangeDetectorRef
  ) {
    if (this.isBrowser) {
      this.L = require('leaflet');
    }
    this.title.setTitle(`Carte des centres de test de dépistage COVID-19 Coronavirus`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: `Vous souhaitez vous faire dépister du Coronavirus COVID-19 ?
      Utilisez notre carte qui permet de retrouver les 50 centres de tests de dépistage
      les plus proches de chez vous.` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: `https://www.cascoronavirus.fr/carte-centres-test-depistage` },
      { property: 'og:title', content: `Carte des centres de test de dépistage COVID-19 Coronavirus` },
      // tslint:disable-next-line:max-line-length
      { property: 'og:description', content: `Vous souhaitez vous faire dépister du Coronavirus COVID-19 ?
      Utilisez notre carte qui permet de retrouver les 50 centres de tests de dépistage
      les plus proches de chez vous.` },
      { property: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/carte_centres_test_depistage_covid_19_coronavirus.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Carte des centres de test de dépistage COVID-19 Coronavirus` },
      // tslint:disable-next-line:max-line-length
      { name: 'twitter:description', content: `Vous souhaitez vous faire dépister du Coronavirus COVID-19 ?
      Utilisez notre carte qui permet de retrouver les 50 centres de tests de dépistage
      les plus proches de chez vous.` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/carte_centres_test_depistage_covid_19_coronavirus.png' },
      { name: 'twitter:site', content: '@cascoronavirus' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  ngOnInit(): void {
    this.searchAdressCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = '';
        this.addressDatas = {};
        this.isLoading = true;
      }),
      switchMap(value => this.coronavirusFranceService.getMapPositionGeoData(value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
      )
    )
    .subscribe(data => {
      this.addressDatas = data;
    });

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
        zoom: 11
      });
      this.icon = {
        icon: this.L.icon({
          // specify the path here
          iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
          iconSize: [24, 36],
          iconAnchor: [12, 36],
          popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
        })
      };

      this.iconCurrentPosition = {
        icon: this.L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      };

      const tiles = this.L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 16,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
      if (init === false) {
        this.coronavirusFranceService.getFranceTestCentres(latitude, longitude).subscribe((result) => {
          this.testCentres = result;
          this.ref.detectChanges();
          const markerCurrentPosition = this.L.marker([latitude, longitude], this.iconCurrentPosition).addTo(this.map);
          markerCurrentPosition.bindPopup('Vous êtes ici !').openPopup();
          result.forEach((item) => {

            const marker = this.L.marker([item.latitude, item.longitude], this.icon).addTo(this.map).on('click', (e) => {
              this.selectedCentre = this.testCentres.find((centre) =>
                e.latlng.lat.toString() === centre.latitude.toString() &&
                e.latlng.lng.toString() === centre.longitude.toString());
              this.ref.detectChanges();
              const el = document.getElementById(this.selectedCentre.id);
              el.scrollIntoView({ block: 'nearest', inline: 'start' });
            });
            const infos = '<div style="text-align: center">' + item.socialReason + '<br>' + item.address + '</div>';
            marker.bindPopup(infos);
          });
        });

      }
    }
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
        navigator.geolocation.getCurrentPosition((position) => {
          this.initMap(position.coords.latitude, position.coords.longitude, false);
        },
          (error) => {
          });
      }
    }
  }

  displayProperty(value) {
    if (value) {
      return value.properties.label;
    }
  }

}

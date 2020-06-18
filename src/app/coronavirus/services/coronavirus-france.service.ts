import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceService {

  private readonly urlCSV = 'https://cascoronavirus-1585048636823.appspot.com/france-datas';
  private readonly urlCSVDay = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-day';
  private readonly urlTest = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-test';
  private readonly urlEmergency = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-urgences';
  private readonly urlTransfert = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-transfert';
  private readonly urlNews = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-news';
  private readonly urlOneNews = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-one-news';
  private readonly urlDeconfinement = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-deconfinement';
  private readonly urlMortality = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-mortality';
  private readonly urlTestCentres = 'https://cascoronavirus-1585048636823.appspot.com/france-datas-centre-depistage';

  constructor(private readonly httpClient: HttpClient) { }

  getData(type: string, code?: string): Observable<any> {
    if (code) {
      return this.httpClient.get(`${this.urlCSV}/${type}?code=${code}`);
    }
    return this.httpClient.get(`${this.urlCSV}/${type}`);
  }

  getDataDay(type: string, code?: string): Observable<any> {
    if (code) {
      return this.httpClient.get(`${this.urlCSVDay}/${type}?code=${code}`);
    }
    return this.httpClient.get(`${this.urlCSVDay}/${type}`);
  }

  getFranceDataTest(type: string, code?: string): Observable<any> {
    if (code) {
      return this.httpClient.get(`${this.urlTest}/${type}?code=${code}`);
    }
    return this.httpClient.get(`${this.urlTest}/${type}`);
  }

  getFranceDataEmergency(type: string, code?: string): Observable<any> {
    if (code) {
      return this.httpClient.get(`${this.urlEmergency}/${type}?code=${code}`);
    }
    return this.httpClient.get(`${this.urlEmergency}/${type}`);
  }

  getFranceDataTransfert(): Observable<any> {
    return this.httpClient.get(`${this.urlTransfert}`);
  }

  getFranceNews(): Observable<any> {
    return this.httpClient.get(`${this.urlNews}`);
  }

  getFranceNewsToday(): Observable<any> {
    return this.httpClient.get(`${this.urlNews}?type=today`);
  }

  getNewsById(slug: string): Observable<any> {
    return this.httpClient.get(`${this.urlOneNews}/${slug}`);
  }

  getDeconfinement(date?: string): Observable<any> {
    if (date) {
      return this.httpClient.get(`${this.urlDeconfinement}/${date}`);
    }
    return this.httpClient.get(`${this.urlDeconfinement}`);
  }

  getFranceMortality(type: string, code?: string): Observable<any> {
    if (code) {
      return this.httpClient.get(`${this.urlMortality}/${type}?code=${code}`);
    }
    return this.httpClient.get(`${this.urlMortality}/${type}`);
  }

  getMapPosition(address: string): Observable<any> {
    return this.httpClient.get(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${address}&format=json&limit=1`);
  }

  getMapPositionReverse(latitude: number, longitude: number): Observable<any> {
    return this.httpClient.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
  }

  getMapPositionGeoData(address: string): Observable<any> {
    return this.httpClient.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&type=housenumber&autocomplete=1`);
  }

  getUseGeojson(): Observable<any> {
    return this.httpClient.get('../../assets/departements.geojson');
  }

  getFranceTestCentres(lat?: number, long?: number): Observable<any> {
    if (lat && long) {
      return this.httpClient.get(`${this.urlTestCentres}/?lat=${lat}&long=${long}`);
    }
    return this.httpClient.get(`${this.urlTestCentres}`);
  }

}

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

}

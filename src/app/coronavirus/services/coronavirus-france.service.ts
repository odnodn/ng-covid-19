import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/* To Rework */
@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceService {

  private readonly urlCSV = 'https://api-novel-coronavirus.herokuapp.com/france-datas';
  private readonly urlTest = 'https://api-novel-coronavirus.herokuapp.com/france-datas-test';
  private readonly urlEmergency = 'https://api-novel-coronavirus.herokuapp.com/france-datas-urgences';
  constructor(private readonly httpClient: HttpClient) { }

  getData(type: string, code?: string): Observable<any> {
    if (code) {
      return this.httpClient.get(`${this.urlCSV}/${type}?code=${code}`);
    }
    return this.httpClient.get(`${this.urlCSV}/${type}`);
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


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/* To Rework */
@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceService {

  private readonly urlCSV = 'http://localhost:3000/france-datas';
  private readonly urlTest = 'http://localhost:3000/france-datas-test';
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

}

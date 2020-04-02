import { FRANCE_REGIONS } from './../constants/france.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Papa from 'papaparse';
import { map } from 'rxjs/operators';
import { FRANCE_DEPS } from '@coronavirus/constants/france.constants';
import { DatePipe } from '@angular/common';

/* To Rework */
@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceService {

  private readonly urlCSVDepartment = 'https://api-novel-coronavirus.herokuapp.com/france-datas/';

  constructor(private readonly httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get(this.urlCSVDepartment);
  }

}

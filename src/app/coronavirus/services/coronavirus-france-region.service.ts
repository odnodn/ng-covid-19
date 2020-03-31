import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceRegionService {

  private readonly urlCSVRegion = 'https://www.data.gouv.fr/fr/datasets/r/d2af5160-a21d-47b7-8f30-3c20dade63b1';

  constructor(private readonly httpClient: HttpClient) { }

  getData(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(`${this.urlCSVRegion}`, httpOptions).pipe(
      map((csv: any) => {
        const data = Papa.parse(csv).data;
        const dataToday = data.filter((row) => row[2] === data[data.length - 2][2] && row[1] === id);
        const statsTotal = {
          hospital: 0,
          todayHospital: 0,
          reanimation: 0,
          todayReanimation: 0,
          recovered: 0,
          todayRecovered: 0,
          deaths: 0,
          todayDeaths: 0
        };
        const statsMen = {
          hospital: 0,
          reanimation: 0,
          recovered: 0,
          deaths: 0,
        };
        const statsWomen = {
          hospital: 0,
          reanimation: 0,
          recovered: 0,
          deaths: 0,
        };

        const statsByDepartment: any[] = [];
        dataToday.forEach((itemData) => {
          if (itemData[1] === '0') { // All
            statsTotal.hospital = statsTotal.hospital + Number(itemData[3]);
            statsTotal.reanimation = statsTotal.reanimation + Number(itemData[4]);
            statsTotal.recovered = statsTotal.recovered + Number(itemData[5]);
            statsTotal.deaths = statsTotal.deaths + Number(itemData[6]);
            const statsOneDep = {
              hospital:  Number(itemData[3]),
              reanimation: Number(itemData[4]),
              recovered: Number(itemData[5]),
              deaths: Number(itemData[6]),
              code: itemData[0],
              name: FRANCE_DEPS.find((dep) => dep.code.toString() === itemData[0]).dep,
              region: FRANCE_DEPS.find((dep) => dep.code.toString() === itemData[0]).region
            };
            statsByDepartment.push(statsOneDep);
          }
          if (itemData[1] === '1') { // Homme
            statsMen.hospital = statsMen.hospital + Number(itemData[3]);
            statsMen.reanimation = statsMen.reanimation + Number(itemData[4]);
            statsMen.recovered = statsMen.recovered + Number(itemData[5]);
            statsMen.deaths = statsMen.deaths + Number(itemData[6]);
          }
          if (itemData[1] === '2') { // Femme
            statsWomen.hospital = statsWomen.hospital + Number(itemData[3]);
            statsWomen.reanimation = statsWomen.reanimation + Number(itemData[4]);
            statsWomen.recovered = statsWomen.recovered + Number(itemData[5]);
            statsWomen.deaths = statsWomen.deaths + Number(itemData[6]);
          }
        });
        const statsByGender = {
          total: statsTotal,
          men: statsMen,
          women: statsWomen
        };
        return {
        };
      }));
  }
}

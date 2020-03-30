import { FRANCE_REGIONS } from './../constants/france.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Papa from 'papaparse';
import { map } from 'rxjs/operators';
import { FRANCE_DEPS } from '@coronavirus/constants/france.constants';

/* To Rework */
@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceService {

  private readonly urlCSVDepartment = 'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';
  private readonly urlCSVAge = 'https://www.data.gouv.fr/fr/datasets/r/219427ba-7e90-4eb1-9ac7-4de2e7e2112c';
  constructor(private readonly httpClient: HttpClient) { }

  getData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(`${this.urlCSVDepartment}`, httpOptions).pipe(
      map((csv: any) => {
        const data = Papa.parse(csv).data;
        const dataToday = data.filter((row) => row[2] === data[data.length - 2][2]);
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
        const statsYesterday = this.getYesterdayDatas(data);
        statsTotal.todayDeaths = statsTotal.deaths - statsYesterday.deaths;
        statsTotal.todayHospital = statsTotal.hospital - statsYesterday.hospital;
        statsTotal.todayReanimation = statsTotal.reanimation - statsYesterday.reanimation;
        statsTotal.todayRecovered = statsTotal.recovered - statsYesterday.recovered;
        const statsByGender = {
          total: statsTotal,
          men: statsMen,
          women: statsWomen
        };
        return {
          statsByDepartment,
          statsByRegion: this.getDataByRegion(statsByDepartment),
          statsByGender,
          lastUpdate: data[data.length - 2][2]
        };
      }));
  }

  getDataByRegion(data: any): any[] {
    const regionDatas = [];
    FRANCE_REGIONS.forEach((regionItem) => {
      const regionStats = data.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      const item = {
        name: regionItem.country,
        code: regionItem.code,
        deaths: regionStats.reduce((total, obj) => obj.deaths + total, 0),
        hospital: regionStats.reduce((total, obj) => obj.hospital + total, 0),
        reanimation: regionStats.reduce((total, obj) => obj.reanimation + total, 0),
        recovered: regionStats.reduce((total, obj) => obj.recovered + total, 0)
      };
      regionDatas.push(item);
    });
    return (regionDatas);
  }

  getYesterdayDatas(data: any): any {
    const dataYesterday = data.filter((row) => row[2] === data[data.length - 310][2]);
    const statsYesterday = {
      hospital: 0,
      reanimation: 0,
      recovered: 0,
      deaths: 0,
      date: data[data.length - 310][2]
    };
    dataYesterday.forEach((itemData) => {
      if (itemData[1] === '0') { // All
        statsYesterday.hospital = statsYesterday.hospital + Number(itemData[3]);
        statsYesterday.reanimation = statsYesterday.reanimation + Number(itemData[4]);
        statsYesterday.recovered = statsYesterday.recovered + Number(itemData[5]);
        statsYesterday.deaths = statsYesterday.deaths + Number(itemData[6]);
      }
    });
    return statsYesterday;
  }

  getDataByAgeFrance(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(`${this.urlCSVAge}`, httpOptions).pipe(
      map((csv: any) => {
        const data = Papa.parse(csv).data;
        const dataByAge = {
          0: {
            ageRange: 'ALL',
            passage: 0,
            hospital: 0,
            medical: 0
          },
          A: {
            ageRange: '-15',
            passage: 0,
            hospital: 0,
            medical: 0
          },
          B: {
            ageRange: '15-44',
            passage: 0,
            hospital: 0,
            medical: 0
          },
          C: {
            ageRange: '45-64',
            passage: 0,
            hospital: 0,
            medical: 0
          },
          D: {
            ageRange: '65-74',
            passage: 0,
            hospital: 0,
            medical: 0
          },
          E: {
            ageRange: '75+',
            passage: 0,
            hospital: 0,
            medical: 0
          }
        };
        data.forEach((dataItem) => {
          if (
            dataItem[2] === 'A' || dataItem[2] === 'B' ||
            dataItem[2] === 'C' || dataItem[2] === 'D' ||
            dataItem[2] === 'E' || dataItem[2] === '0'
          ) {
            dataByAge[dataItem[2]].passage = dataByAge[dataItem[2]].passage + Number(dataItem[3]);
            dataByAge[dataItem[2]].hospital = dataByAge[dataItem[2]].hospital + Number(dataItem[5]);
            dataByAge[dataItem[2]].medical = dataByAge[dataItem[2]].medical + Number(dataItem[12]);
          }
        });
        return dataByAge;
      }));
  }
}

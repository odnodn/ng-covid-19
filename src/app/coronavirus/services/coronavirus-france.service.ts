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
  private readonly urlCSVAge = 'https://www.data.gouv.fr/fr/datasets/r/eceb9fb4-3ebc-4da3-828d-f5939712600a';
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
        const departmentStat: any = {
          total: [],
          men: [],
          women: []
        };
        const mapValue = {
          0: 'total',
          1: 'men',
          2: 'women'
        };
        const stat = {
          hospital: 0,
          reanimation: 0,
          recovered: 0,
          deaths: 0
        };
        const nationalStat: any = {
          total: stat,
          men: stat,
          women: stat
        };
        dataToday.forEach((itemData) => {
          const departementItemStat = {
            hospital:  Number(itemData[3]),
            reanimation: Number(itemData[4]),
            recovered: Number(itemData[5]),
            deaths: Number(itemData[6]),
            code: itemData[0],
            name: FRANCE_DEPS.find((dep) => dep.code.toString() === itemData[0]).name,
            region: FRANCE_DEPS.find((dep) => dep.code.toString() === itemData[0]).region
          };
          nationalStat[mapValue[itemData[1]]] = {
            hospital: nationalStat[mapValue[itemData[1]]].hospital + Number(itemData[3]),
            reanimation:  nationalStat[mapValue[itemData[1]]].reanimation + Number(itemData[4]),
            recovered:  nationalStat[mapValue[itemData[1]]].recovered + Number(itemData[5]),
            deaths: nationalStat[mapValue[itemData[1]]].deaths + Number(itemData[6]),
          };
          departmentStat[mapValue[itemData[1]]].push(departementItemStat);
        });
        return {
          national: nationalStat,
          department: departmentStat,
          region: this.getDataByRegion(departmentStat),
          lastUpdate: data[data.length - 2][2]
        };
      }));
  }

  getDataByRegion(data: any): any {
    const regionDatas = {
      total: [],
      men: [],
      women: []
    };
    FRANCE_REGIONS.forEach((regionItem) => {
      const total = data.total.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      const men = data.men.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      const women = data.women.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      const itemTotal = {
        name: regionItem.name,
        code: regionItem.code,
        deaths: total.reduce((result, obj) => obj.deaths + result, 0),
        hospital: total.reduce((result, obj) => obj.hospital + result, 0),
        reanimation: total.reduce((result, obj) => obj.reanimation + result, 0),
        recovered: total.reduce((result, obj) => obj.recovered + result, 0)
      };
      const itemMen = {
        name: regionItem.name,
        code: regionItem.code,
        deaths: men.reduce((result, obj) => obj.deaths + result, 0),
        hospital: men.reduce((result, obj) => obj.hospital + result, 0),
        reanimation: men.reduce((result, obj) => obj.reanimation + result, 0),
        recovered: men.reduce((result, obj) => obj.recovered + result, 0)
      };
      const itemWomen = {
        name: regionItem.name,
        code: regionItem.code,
        deaths: women.reduce((result, obj) => obj.deaths + result, 0),
        hospital: women.reduce((result, obj) => obj.hospital + result, 0),
        reanimation: women.reduce((result, obj) => obj.reanimation + result, 0),
        recovered: women.reduce((result, obj) => obj.recovered + result, 0)
      };
      regionDatas.total.push(itemTotal);
      regionDatas.women.push(itemWomen);
      regionDatas.men.push(itemMen);
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
        const departmentStat: any = [];
        FRANCE_DEPS.forEach((depItem) => {
          const departmentO = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === '0');
          const departmentA = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'A');
          const departmentB = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'B' );
          const departmentC = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'C' );
          const departmentD = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'D' );
          const departmentE = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'E' );
          const itemTotal = {
            name: depItem.name,
            code: depItem.code,
            region: depItem.region,
            0: {
              passage: departmentO.reduce((result, obj) => Number(obj[3]) + result, 0),
              hospital: departmentO.reduce((result, obj) => Number(obj[5]) + result, 0),
              medical: departmentO.reduce((result, obj) => Number(obj[12]) + result, 0),
              ageRange: 'ALL'
            },
            A: {
              passage: departmentA.reduce((result, obj) => Number(obj[3]) + result, 0),
              hospital: departmentA.reduce((result, obj) => Number(obj[5]) + result, 0),
              medical: departmentA.reduce((result, obj) => Number(obj[12]) + result, 0),
              ageRange: '-15'
            },
            B: {
              passage: departmentB.reduce((result, obj) => Number(obj[3]) + result, 0),
              hospital: departmentB.reduce((result, obj) => Number(obj[5]) + result, 0),
              medical: departmentB.reduce((result, obj) => Number(obj[12]) + result, 0),
              ageRange: '15-44'
            },
            C: {
              passage: departmentC.reduce((result, obj) => Number(obj[3]) + result, 0),
              hospital: departmentC.reduce((result, obj) => Number(obj[5]) + result, 0),
              medical: departmentC.reduce((result, obj) => Number(obj[12]) + result, 0),
              ageRange: '45-64'
            },
            D: {
              passage: departmentD.reduce((result, obj) => Number(obj[3]) + result, 0),
              hospital: departmentD.reduce((result, obj) => Number(obj[5]) + result, 0),
              medical: departmentD.reduce((result, obj) => Number(obj[12]) + result, 0),
              ageRange: '65-74'
            },
            E: {
              passage: departmentE.reduce((result, obj) => Number(obj[3]) + result, 0),
              hospital: departmentE.reduce((result, obj) => Number(obj[5]) + result, 0),
              medical: departmentE.reduce((result, obj) => Number(obj[12]) + result, 0),
              ageRange: '75+'
            }
          };
          departmentStat.push(itemTotal);
        });
        const nationalStat = {
          0: {
            ageRange: 'ALL',
            passage: departmentStat.reduce((result, obj) => Number(obj['0'].passage) + result, 0),
            hospital: departmentStat.reduce((result, obj) => Number(obj['0'].hospital) + result, 0),
            medical: departmentStat.reduce((result, obj) => Number(obj['0'].medical) + result, 0),
          },
          A: {
            ageRange: '-15',
            passage: departmentStat.reduce((result, obj) => Number(obj.A.passage) + result, 0),
            hospital: departmentStat.reduce((result, obj) => Number(obj.A.hospital) + result, 0),
            medical: departmentStat.reduce((result, obj) => Number(obj.A.medical) + result, 0),
          },
          B: {
            ageRange: '15-44',
            passage: departmentStat.reduce((result, obj) => Number(obj.B.passage) + result, 0),
            hospital: departmentStat.reduce((result, obj) => Number(obj.B.hospital) + result, 0),
            medical: departmentStat.reduce((result, obj) => Number(obj.B.medical) + result, 0),
          },
          C: {
            ageRange: '45-64',
            passage: departmentStat.reduce((result, obj) => Number(obj.C.passage) + result, 0),
            hospital: departmentStat.reduce((result, obj) => Number(obj.C.hospital) + result, 0),
            medical: departmentStat.reduce((result, obj) => Number(obj.C.medical) + result, 0),
          },
          D: {
            ageRange: '65-74',
            passage: departmentStat.reduce((result, obj) => Number(obj.D.passage) + result, 0),
            hospital: departmentStat.reduce((result, obj) => Number(obj.D.hospital) + result, 0),
            medical: departmentStat.reduce((result, obj) => Number(obj.D.medical) + result, 0),
          },
          E: {
            ageRange: '75+',
            passage: departmentStat.reduce((result, obj) => Number(obj.E.passage) + result, 0),
            hospital: departmentStat.reduce((result, obj) => Number(obj.E.hospital) + result, 0),
            medical: departmentStat.reduce((result, obj) => Number(obj.E.medical) + result, 0),
          }
        };
        return {
          national: nationalStat,
          department: departmentStat,
          region: this.getDataByAgeRegionFrance(departmentStat)
        };
      }));
  }

  getDataByAgeRegionFrance(data: any): any {
    const regionStats = [];
    FRANCE_REGIONS.forEach((regionItem) => {
      const departments = data.filter((dataItem) => dataItem.region.code === regionItem.code);
      const regionStat = {
        name: regionItem.name,
        code: regionItem.code,
        0: {
          ageRange: 'ALL',
          passage: departments.reduce((result, obj) => Number(obj['0'].passage) + result, 0),
          hospital: departments.reduce((result, obj) => Number(obj['0'].hospital) + result, 0),
          medical: departments.reduce((result, obj) => Number(obj['0'].medical) + result, 0),
        },
        A: {
          ageRange: '-15',
          passage: departments.reduce((result, obj) => Number(obj.A.passage) + result, 0),
          hospital: departments.reduce((result, obj) => Number(obj.A.hospital) + result, 0),
          medical: departments.reduce((result, obj) => Number(obj.A.medical) + result, 0),
        },
        B: {
          ageRange: '15-44',
          passage: departments.reduce((result, obj) => Number(obj.B.passage) + result, 0),
          hospital: departments.reduce((result, obj) => Number(obj.B.hospital) + result, 0),
          medical: departments.reduce((result, obj) => Number(obj.B.medical) + result, 0),
        },
        C: {
          ageRange: '45-64',
          passage: departments.reduce((result, obj) => Number(obj.C.passage) + result, 0),
          hospital: departments.reduce((result, obj) => Number(obj.C.hospital) + result, 0),
          medical: departments.reduce((result, obj) => Number(obj.C.medical) + result, 0),
        },
        D: {
          ageRange: '65-74',
          passage: departments.reduce((result, obj) => Number(obj.D.passage) + result, 0),
          hospital: departments.reduce((result, obj) => Number(obj.D.hospital) + result, 0),
          medical: departments.reduce((result, obj) => Number(obj.D.medical) + result, 0),
        },
        E: {
          ageRange: '75+',
          passage: departments.reduce((result, obj) => Number(obj.E.passage) + result, 0),
          hospital: departments.reduce((result, obj) => Number(obj.E.hospital) + result, 0),
          medical: departments.reduce((result, obj) => Number(obj.E.medical) + result, 0),
        }
      };
      regionStats.push(regionStat);
    });
    return regionStats;
  }
}

import { FRANCE_REGIONS } from './../constants/france.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Papa from 'papaparse';
import { map } from 'rxjs/operators';
import { FRANCE_DEPS } from '@coronavirus/constants/france.constants';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceAgeService {

  private readonly urlCSVAge = 'https://www.data.gouv.fr/fr/datasets/r/eceb9fb4-3ebc-4da3-828d-f5939712600a';

  constructor(private readonly httpClient: HttpClient) { }

  getFranceDataByAge(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      responseType: 'text' as 'json'
    };

    return this.httpClient.get(`${this.urlCSVAge}`, httpOptions).pipe(
      map((csv: any) => {
        const data = Papa.parse(csv).data;
        const departmentData = this.getDepartmentDataByAge(data);
        const regionData = this.getRegionDataByAge(departmentData);
        const nationalData = this.getNationalDataByAge(departmentData);
        return {
          department: departmentData,
          national: nationalData,
          region: regionData
        };
      }));
  }

  private getNationalDataByAge(departmentStat: any[]): any {
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
    return (nationalStat);
  }

  private getRegionDataByAge(departmentData: any[]): any {
    const regionStats = [];
    FRANCE_REGIONS.forEach((regionItem) => {
      const departments = departmentData.filter((dataItem) => dataItem.region.code === regionItem.code);
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

  private getDepartmentDataByAge(data: any[]): any {
    const departmentStat: any = [];
    FRANCE_DEPS.forEach((depItem) => {
      const departmentO = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === '0');
      const departmentA = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'A');
      const departmentB = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'B');
      const departmentC = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'C');
      const departmentD = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'D');
      const departmentE = data.filter((dataItem) => dataItem[0] === depItem.code && dataItem[2] === 'E');
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
    return (departmentStat);
  }
}

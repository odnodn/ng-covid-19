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

  private readonly urlCSVDepartment = 'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';

  constructor(private readonly httpClient: HttpClient, private datePipe: DatePipe) { }

  getData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(`${this.urlCSVDepartment}`, httpOptions).pipe(
      map((csv: any) => {
        const data = Papa.parse(csv).data; // decode csv
        const lastDate = data[data.length - 2][2]; // get last date
        /* Department */
        const timelineDepartmentStat = this.getTimelineDepartmentStat(data);
        const lastDepartmentStat = this.getLastDepartmentStat(timelineDepartmentStat, lastDate);

        /* Region */
        const timelineRegionStat = this.getTimelineRegionStat(timelineDepartmentStat);
        const lastRegionStat = this.getLastRegionStat(lastDepartmentStat);

        /* National */
        const timelineNationalStat = this.getTimelineNationalStat(timelineDepartmentStat);
        const lastNationalStat = this.getLastNationalStat(timelineNationalStat);

        const returnValue = {
          timeline: {
            national: timelineNationalStat,
            department: timelineDepartmentStat.filter((item) => item.type === 'total'),
            region: timelineRegionStat
          },
          national: lastNationalStat,
          department: lastDepartmentStat,
          region: lastRegionStat,
          lastUpdate: data[data.length - 2][2]
        };
        return returnValue;
      }));
  }

  getLastDepartmentStat(timelineDepartmentStat: any, lastDate: string) {
    const lastDepartmentStat = {
      total: timelineDepartmentStat.filter((timelineItem) => timelineItem.date === lastDate && timelineItem.type === 'total'),
      men: timelineDepartmentStat.filter((timelineItem) => timelineItem.date === lastDate && timelineItem.type === 'men'),
      women: timelineDepartmentStat.filter((timelineItem) => timelineItem.date === lastDate && timelineItem.type === 'women')
    };
    return (lastDepartmentStat);
  }

  getTimelineDepartmentStat(data: any): any[] {
    const timelineDepartmentStat = [];
    const stat = {
      hospital: 0,
      reanimation: 0,
      recovered: 0,
      deaths: 0
    };
    const departmentStat = {
      total: stat,
      men: stat,
      women: stat
    };
    const mapValue = {
      0: 'total',
      1: 'men',
      2: 'women'
    };
    data.forEach((item) => {
      if (mapValue[item[1]]) {
        const department = FRANCE_DEPS.find((dep) => dep.code === item[0]);
        departmentStat[mapValue[item[1]]] = {
          hospital: Number(item[3]),
          reanimation: Number(item[4]),
          recovered: Number(item[5]),
          deaths: Number(item[6]),
          region: department ? department.region : null,
          code: item[0],
          date: item[2],
          type: mapValue[item[1]]
        };
        timelineDepartmentStat.push(departmentStat[mapValue[item[1]]]);
      }
    });
    return (timelineDepartmentStat);
  }

  getLastNationalStat(timelineNationalStat: any) {
    const lastElement = timelineNationalStat.total.length - 1;
    const beforeLastElement = timelineNationalStat.total.length - 2;
    const nationalStat = {
      total: {
        hospital: timelineNationalStat.total[lastElement].hospital,
        todayHospital: timelineNationalStat.total[lastElement].hospital - timelineNationalStat.total[beforeLastElement].hospital,
        reanimation: timelineNationalStat.total[lastElement].reanimation,
        todayReanimation: timelineNationalStat.total[lastElement].reanimation - timelineNationalStat.total[beforeLastElement].reanimation,
        recovered: timelineNationalStat.total[lastElement].recovered,
        todayRecovered: timelineNationalStat.total[lastElement].recovered - timelineNationalStat.total[beforeLastElement].recovered,
        deaths: timelineNationalStat.total[lastElement].deaths,
        todayDeaths: timelineNationalStat.total[lastElement].deaths - timelineNationalStat.total[beforeLastElement].deaths
      },
      men: {
        hospital: timelineNationalStat.men[lastElement].hospital,
        todayHospital: timelineNationalStat.men[lastElement].hospital - timelineNationalStat.men[beforeLastElement].hospital,
        reanimation: timelineNationalStat.men[lastElement].reanimation,
        todayReanimation: timelineNationalStat.men[lastElement].reanimation - timelineNationalStat.men[beforeLastElement].reanimation,
        recovered: timelineNationalStat.men[lastElement].recovered,
        todayRecovered: timelineNationalStat.men[lastElement].recovered - timelineNationalStat.men[beforeLastElement].recovered,
        deaths: timelineNationalStat.men[lastElement].deaths,
        todayDeaths: timelineNationalStat.men[lastElement].deaths - timelineNationalStat.men[beforeLastElement].deaths
      },
      women: {
        hospital: timelineNationalStat.women[lastElement].hospital,
        todayHospital: timelineNationalStat.women[lastElement].hospital - timelineNationalStat.women[beforeLastElement].hospital,
        reanimation: timelineNationalStat.women[lastElement].reanimation,
        todayReanimation: timelineNationalStat.women[lastElement].reanimation - timelineNationalStat.women[beforeLastElement].reanimation,
        recovered: timelineNationalStat.women[lastElement].recovered,
        todayRecovered: timelineNationalStat.women[lastElement].recovered - timelineNationalStat.women[beforeLastElement].recovered,
        deaths: timelineNationalStat.women[lastElement].deaths,
        todayDeaths: timelineNationalStat.women[lastElement].deaths - timelineNationalStat.women[beforeLastElement].deaths
      }
    };
    return (nationalStat);
  }

  getTimelineNationalStat(timelineDepartmentStat: any): any {
    const statTotal = {
      total: [],
      men: [],
      women: []
    };
    const types: any[] = ['total', 'men', 'women'];
    types.forEach((typeItem) => {
      const start = new Date(timelineDepartmentStat[0].date);
      const end = new Date(timelineDepartmentStat[timelineDepartmentStat.length - 1].date);
      let loop = new Date(start);
      while (loop <= end) {
        const dataToday = timelineDepartmentStat.filter((row) => row.date ===
          this.datePipe.transform(loop, 'yyyy-MM-dd') && row.type === typeItem);
        const stat = {
          date: this.datePipe.transform(loop, 'yyyy-MM-dd'),
          hospital: dataToday.reduce((result, item) => item.hospital + result, 0),
          reanimation: dataToday.reduce((result, item) => item.reanimation + result, 0),
          recovered: dataToday.reduce((result, item) => item.recovered + result, 0),
          deaths: dataToday.reduce((result, item) => item.deaths + result, 0),
        };
        statTotal[typeItem].push(stat);
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
    });
    return statTotal;
  }

  getLastRegionStat(lastDepartmentStat: any): any {
    const regionDatas = {
      total: [],
      men: [],
      women: []
    };
    FRANCE_REGIONS.forEach((regionItem) => {
      const total = lastDepartmentStat.total.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      const men = lastDepartmentStat.men.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      const women = lastDepartmentStat.women.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
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

  getTimelineRegionStat(timelineDepartmentStat: any): any[] {
    const statTotal = [];
    FRANCE_REGIONS.forEach((regionItem) => {
      const start = new Date(timelineDepartmentStat[0].date);
      const end = new Date(timelineDepartmentStat[timelineDepartmentStat.length - 1].date);
      let loop = new Date(start);
      while (loop <= end) {
        const total = timelineDepartmentStat.filter((statsDepItem) =>
          statsDepItem.region?.code === regionItem.code &&
          statsDepItem.date === this.datePipe.transform(loop, 'yyyy-MM-dd') && statsDepItem.type === 'total');
        const itemTotal = {
          code: regionItem.code,
          deaths: total.reduce((result, obj) => obj.deaths + result, 0),
          hospital: total.reduce((result, obj) => obj.hospital + result, 0),
          reanimation: total.reduce((result, obj) => obj.reanimation + result, 0),
          recovered: total.reduce((result, obj) => obj.recovered + result, 0),
          date: this.datePipe.transform(loop, 'yyyy-MM-dd')
        };
        statTotal.push(itemTotal);
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
    });
    return (statTotal);
  }

}

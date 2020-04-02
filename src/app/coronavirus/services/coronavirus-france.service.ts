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
        const lastRegionStat = this.getLastRegionStat(timelineDepartmentStat, lastDate);
        /* National */
        const timelineNationalStat = this.getTimelineNationalStat(timelineDepartmentStat);
        const lastNationalStat = this.getLastNationalStat(timelineNationalStat);
        return {
          timeline: {
            national: timelineNationalStat,
            department: timelineDepartmentStat.total,
            region: timelineRegionStat
          },
          national: lastNationalStat,
          department: lastDepartmentStat,
          region: lastRegionStat,
          lastUpdate: data[data.length - 2][2]
        };
      }));
  }

  getLastDepartmentStat(timelineDepartmentStat: any, lastDate: string) {
    const lastDepartmentStat = {
      total: timelineDepartmentStat.total.filter((timelineItem) => timelineItem.date === lastDate),
      men: timelineDepartmentStat.men.filter((timelineItem) => timelineItem.date === lastDate),
      women: timelineDepartmentStat.women.filter((timelineItem) => timelineItem.date === lastDate)
    };
    return (lastDepartmentStat);
  }

  getTimelineDepartmentStat(data: any): any {
    const timelineDepartmentStat = {
      total: [],
      men: [],
      women: []
    };
    const mapValue = {
      0: 'total',
      1: 'men',
      2: 'women'
    };
    data.forEach((item) => {
      if (mapValue[item[1]]) {
        const department = FRANCE_DEPS.find((dep) => dep.code === item[0]);
        const departmentStat = {
          hospital: Number(item[3]),
          reanimation: Number(item[4]),
          recovered: Number(item[5]),
          deaths: Number(item[6]),
          region: department ? department.region : null,
          translation: department ? department.name : null,
          code: item[0],
          date: item[2]
        };
        timelineDepartmentStat[mapValue[item[1]]].push(departmentStat);
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
        reanimation: timelineNationalStat.men[lastElement].reanimation,
        recovered: timelineNationalStat.men[lastElement].recovered,
        deaths: timelineNationalStat.men[lastElement].deaths
      },
      women: {
        hospital: timelineNationalStat.women[lastElement].hospital,
        reanimation: timelineNationalStat.women[lastElement].reanimation,
        recovered: timelineNationalStat.women[lastElement].recovered,
        deaths: timelineNationalStat.women[lastElement].deaths,
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
      const start = new Date(timelineDepartmentStat.total[0].date);
      const end = new Date(timelineDepartmentStat.total[timelineDepartmentStat.total.length - 1].date);
      let loop = new Date(start);
      while (loop <= end) {
        const dataToday = timelineDepartmentStat[typeItem].filter((row) => row.date ===
          this.datePipe.transform(loop, 'yyyy-MM-dd'));
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

  getLastRegionStat(timelineDepartmentStat: any, lastDate: Date): any {
    const regionDatas = {
      total: [],
      men: [],
      women: []
    };
    FRANCE_REGIONS.forEach((regionItem) => {
      const total = timelineDepartmentStat.total.filter((statsDepItem) => statsDepItem.region?.code === regionItem.code && statsDepItem.date === lastDate);
      const men = timelineDepartmentStat.men.filter((statsDepItem) => statsDepItem.region?.code === regionItem.code  && statsDepItem.date === lastDate);
      const women = timelineDepartmentStat.women.filter((statsDepItem) => statsDepItem.region?.code === regionItem.code  && statsDepItem.date === lastDate);
      const itemTotal = {
        code: regionItem.code,
        translation: regionItem.name,
        deaths: total.reduce((result, obj) => obj.deaths + result, 0),
        hospital: total.reduce((result, obj) => obj.hospital + result, 0),
        reanimation: total.reduce((result, obj) => obj.reanimation + result, 0),
        recovered: total.reduce((result, obj) => obj.recovered + result, 0)
      };
      const itemMen = {
        code: regionItem.code,
        translation: regionItem.name,
        deaths: men.reduce((result, obj) => obj.deaths + result, 0),
        hospital: men.reduce((result, obj) => obj.hospital + result, 0),
        reanimation: men.reduce((result, obj) => obj.reanimation + result, 0),
        recovered: men.reduce((result, obj) => obj.recovered + result, 0)
      };
      const itemWomen = {
        code: regionItem.code,
        translation: regionItem.name,
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
      const start = new Date(timelineDepartmentStat.total[0].date);
      const end = new Date(timelineDepartmentStat.total[timelineDepartmentStat.total.length - 1].date);
      let loop = new Date(start);
      while (loop <= end) {
        const total = timelineDepartmentStat.total.filter((statsDepItem) =>
          statsDepItem.region?.code === regionItem.code &&
          statsDepItem.date === this.datePipe.transform(loop, 'yyyy-MM-dd'));
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

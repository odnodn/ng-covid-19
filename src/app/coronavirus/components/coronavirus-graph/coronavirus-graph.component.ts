import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';
@Component({
  selector: 'app-coronavirus-graph',
  templateUrl: './coronavirus-graph.component.html',
  styleUrls: ['./coronavirus-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphComponent implements OnInit {

  @Input() data;
  @Input() dataFrance;
  @Input() dataDeaths;
  @Input() dataRecovered;
  @Input() dataConfirmed;
  totalConfirmed: any[] = [];
  totalRecovered: any[] = [];
  totalDeaths: any[] = [];
  dates: string[] = [];
  chartDatas: any[];
  colorScheme = {
    domain: ['#ffbb00', '#f9461c', '#43D787']
  };
  referenceLines: any[] = [];
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  constructor(private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.dataFrance) {
      this.initChart();
      return;
    }
    this.initDatas();
    this.chartDatas = [
      {
        name: 'Recensés',
        series: this.totalConfirmed
      },
      {
        name: 'Morts',
        series: this.totalDeaths
      },
      {
        name: 'Guéris',
        series: this.totalRecovered
      }
    ];
  }

  private initDatasWorld(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        if (element.confirmed && element.confirmed.total) {
          const caseItem = {
            name: this.datePipe.transform(element.reportDate, 'dd/MM'),
            value: element.confirmed.total
          };
          this.totalConfirmed.push(caseItem);
        }

        if (element.recovered && element.recovered.total) {
          const recoveredItem = {
            name: this.datePipe.transform(element.reportDate, 'dd/MM'),
            value: element.recovered.total
          };
          this.totalRecovered.push(recoveredItem);
        }
        if (element.deaths && element.deaths.total) {
          const deathItem = {
            name: this.datePipe.transform(element.reportDate, 'dd/MM'),
            value: element.deaths.total
          };

          this.totalDeaths.push(deathItem);
        }

      }
    });
  }

  private initDatasCountry(): void {
    this.dataDeaths.forEach((element, index) => {
      if (this.dataDeaths.length - index < 15) {
        const deathItem = {
          name: this.datePipe.transform(element.date, 'dd/MM'),
          value: element.totalCases
        };
        this.totalDeaths.push(deathItem);
      }
    });
    this.dataConfirmed.forEach((element, index) => {
      if (this.dataConfirmed.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.date, 'dd/MM'),
          value: element.totalCases
        };
        this.totalConfirmed.push(caseItem);
      }
    });
    this.dataRecovered.forEach((element, index) => {
      if (this.dataRecovered.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.date, 'dd/MM'),
          value: element.totalCases
        };
        this.totalRecovered.push(caseItem);
      }
    });
  }

  private initDatas(): void {
    if (this.data) {
      this.initDatasWorld();
    } else {
      this.initDatasCountry();
    }
  }

  private initChart(): void {
    // Create chart instance
    const chart = am4core.create(this.chartElement.nativeElement, am4charts.XYChart);
    chart.language.locale = am4lang_fr_FR;
    chart.dateFormatter.dateFormat = 'dd MMMM';
    // Add data
    chart.data = this.dataFrance;

    // Date axis
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.fontSize = 13;
    // Value axis
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 20;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.fontSize = 13;

    this.createSeries(chart, 'date', 'hospital', 'hospitalisations en cours', '#F17D07');
    this.createSeries(chart, 'date', 'reanimation', 'en réanimaton', '#E95D0C');
    this.createSeries(chart, 'date', 'deaths', 'décès', '#f9461c');
    this.createSeries(chart, 'date', 'recovered', 'guéris', '#43D787');

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    // Add legend
    chart.legend = new am4charts.Legend();
  }

  private createSeries(chart: am4charts.XYChart, valueX: string, valueY: string, name: string, color: string): void {
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = valueY;
    series.dataFields.dateX = valueX;
    series.name = name;
    series.strokeWidth = 2;
    series.stroke = am4core.color(color); // red
    series.fill = am4core.color(color);
    series.fontSize = 13;

    /* Tooltip */
    series.tooltipText = '{dateX}\n[bold]{valueY}[/] {name}';
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color(color);
    series.tooltip.label.textAlign = 'middle';
    series.tooltip.label.textValign = 'middle';
    series.tooltip.label.fontSize = 13;

    /* Bullet */
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.stroke = am4core.color(color);
    /* Hover */
    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

  }
}

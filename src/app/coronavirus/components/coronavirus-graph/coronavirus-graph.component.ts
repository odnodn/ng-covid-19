import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-graph',
  templateUrl: './coronavirus-graph.component.html',
  styleUrls: ['./coronavirus-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphComponent implements OnInit, OnDestroy {

  @Input() data;
  @Input() dataFrance;
  @Input() dataEsms;
  @Input() dailyDatasByCountry;
  chart: am4charts.XYChart;
  chartDatas: any[];
  dataType = 'total';
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeChange(): void {
    this.dataFrance[this.dataType].map((date => new Date(date)));
    this.chart.data = this.dataFrance[this.dataType];
    if (!this.dataFrance.total[0].code) { // is national data page
      if (this.dataType === 'men' || this.dataType === 'women') {
        this.chart.series.removeIndex(
          this.chart.series.indexOf(this.chart.map.getKey('Cas confirmés'))
        ).dispose();
        this.chart.map.getKey('Décès').dataFields.valueY = 'deaths';
      } else {
        this.createSeries('date', 'cases', 'Cas confirmés', '#ffbb00');
        this.chart.map.getKey('Décès').dataFields.valueY = 'deathsJHU';
      }
    }

  }

  private initChart(): void {
    // Create chart instance
    this.chart = am4core.create(this.chartElement.nativeElement, am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.padding(10, 0, 0, 0);
    // Date axis
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.fontSize = 13;
    // Value axis
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 20;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.fontSize = 13;

    if (this.dataFrance) {
      this.dataFrance.total = this.dataFrance.total.filter((item) => item.date !== '2020-05-14');
      this.dataFrance.men = this.dataFrance.men.filter((item) => item.date !== '2020-05-14');
      this.dataFrance.women = this.dataFrance.women.filter((item) => item.date !== '2020-05-14');
      if (!this.dataFrance.total[0].code) {
        this.createSeries('date', 'cases', 'Cas confirmés', '#ffbb00');
      }
      this.createSeries('date', 'hospital', 'Hospitalisations en cours', '#F17D07');
      this.createSeries('date', 'reanimation', 'Réanimations en cours', '#E95D0C');
      if (!this.dataFrance.total[0].code) {
        this.createSeries('date', 'deathsJHU', 'Décès', '#f9461c');
      } else {
        this.createSeries('date', 'deaths', 'Décès', '#f9461c');
      }
      this.createSeries('date', 'recovered', 'Guéris', '#43D787');
      this.chart.data = this.dataFrance[this.dataType];
    } else if (this.dailyDatasByCountry) {
      this.createSeries('date', 'cases', 'Confirmés', '#ffbb00');
      this.createSeries('date', 'deaths', 'Décès', '#f9461c');
      this.createSeries('date', 'recovered', 'Guéris', '#43D787');
      this.chart.data = this.dailyDatasByCountry;
    } else if (this.dataEsms) {
      this.createSeries('date', 'casesEsms', 'Cas confirmés ESMS', '#ffbb00');
      this.createSeries('date', 'signaledCasesEsms', 'Cas signalés ESMS', '#F17D07');
      this.createSeries('date', 'deathsEsms', 'Décès ESMS', '#f9461c');
      this.chart.data = this.dataEsms.filter((item) => item.deathsEsms);
    }  else {
      this.createSeries('date', 'cases', 'Confirmés', '#ffbb00');
      this.createSeries('date', 'deaths', 'Décès', '#f9461c');
      this.chart.data = this.data;
    }

    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();
    // Add legend
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.fontSize = 14;
    this.chart.legend.maxHeight = 500;
  }

  private createSeries(valueX: string, valueY: string, name: string, color: string): void {
    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = valueY;
    series.dataFields.dateX = valueX;
    series.name = name;
    series.id = name;
    series.strokeWidth = 2;
    series.stroke = am4core.color(color); // red
    series.fill = am4core.color(color);
    series.fontSize = 13;
    series.showOnInit = false;
    /* Tooltip */
    series.tooltipText = '{dateX}\n[bold]{valueY}[/] {name}';
    series.tooltip.background.strokeOpacity = 1;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color(color);
    series.tooltip.label.textAlign = 'middle';
    series.tooltip.label.fontSize = 13;

    /* Bullet */
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color(color);
    /* Hover */
    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

  }

}

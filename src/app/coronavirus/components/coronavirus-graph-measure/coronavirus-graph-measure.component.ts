import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-graph-measure',
  templateUrl: './coronavirus-graph-measure.component.html',
  styleUrls: ['./coronavirus-graph-measure.component.scss']
})
export class CoronavirusGraphMeasureComponent implements OnInit, OnDestroy {

  @Input() data;
  @Input() type;
  chart: am4charts.XYChart;
  chartDatas: any[];
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

  private initChart(): void {
    // Create chart instance
    this.chart = am4core.create(this.chartElement.nativeElement, am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.padding(10, 0, 0, 0);
    this.chart.numberFormatter.numberFormat = '#.00';
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

    if (!this.data) {
      return;
    }
    if (this.type === 'rZero') {
      this.createSeries('date', 'rZero', 'R0', '#0069cc');
      this.createRefLine(valueAxis, '#43d787', 0, 1);
      this.createRefLine(valueAxis, '#F17D07', 1, 1.5);
      this.createRefLine(valueAxis, '#f9461c', 1.5, 20);
    }
    if (this.type === 'incidentRate') {
      this.createSeries('date', 'incidentRate', 'Taux d\'incidence', '#0069cc');
      this.createRefLine(valueAxis, '#43d787', 0, 10);
      this.createRefLine(valueAxis, '#F17D07', 10, 50);
      this.createRefLine(valueAxis, '#f9461c', 50, 1000);
    }
    if (this.type === 'reanimationCapacity') {
      this.createSeries('date', 'reanimationCapacity', 'Taux d\'occupation des lits de réanimation/SI/SC par les patients atteints du COVID-19', '#0069cc');
      this.createRefLine(valueAxis, '#43d787', 0, 40);
      this.createRefLine(valueAxis, '#F17D07', 40, 60);
      this.createRefLine(valueAxis, '#f9461c', 60, 6000);
    }
    if (this.type === 'positiveRate') {
      this.createSeries('date', 'positiveRate', 'Taux de positivité des tests virologiques', '#0069cc');
      this.createRefLine(valueAxis, '#43d787', 0, 5);
      this.createRefLine(valueAxis, '#F17D07', 5, 10);
      this.createRefLine(valueAxis, '#f9461c', 10, 100);
    }

    this.chart.data = this.data;
    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();
    // Add legend
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.fontSize = 14;
    this.chart.legend.maxHeight = 500;
  }

  private createRefLine(valueAxis: any, color: string, startValue: number, endValue: number): void {
    const range = valueAxis.axisRanges.create();
    range.value = startValue;
    range.endValue = endValue;
    range.axisFill.fill = color;
    range.axisFill.fillOpacity = 0.2;

    // const range2 = valueAxis.axisRanges.create();
    // range2.value = startValue;
    // range2.grid.stroke = color;
    // range2.grid.strokeWidth = 2;
    // range2.grid.strokeOpacity = 1;
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
    if (valueY === 'reanimationCapacity' || valueY === 'positiveRate') {
      series.tooltipText = '{dateX}\n[bold]{valueY}[/] % : {name}';
    }

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

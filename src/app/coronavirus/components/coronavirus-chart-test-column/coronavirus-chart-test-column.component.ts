import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-chart-test-column',
  templateUrl: './coronavirus-chart-test-column.component.html',
  styleUrls: ['./coronavirus-chart-test-column.component.scss']
})
export class CoronavirusChartTestColumnComponent implements OnInit {

  chart: am4charts.XYChart;
  @Input() data;
  constructor() { }

  ngOnInit(): void {
    this.chart = am4core.create('chart-column-test', am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.legend = new am4charts.Legend();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous');
    this.createXSeries();
    this.createYSeries();
    this.createSeries('testTotalPositive', 'Tests positifs', '#f9461c');
    this.createSeries('testTotalNegative', 'Tests négatifs', '#f2f2f2');
  }

  private createXSeries(): void {
    const categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.fontSize = 13;
  }

  private createYSeries(): void {
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = 13;
    valueAxis.title.text = 'Tests réalisés';
  }

  private createSeries(field: string, name: string, color: string): void {
    const series1 = this.chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.strokeOpacity = 0;
    series1.columns.template.fill = am4core.color(color);
    series1.columns.template.width = am4core.percent(75);
    series1.columns.template.tooltipText =
      '{dateX} \n {valueY} soit {valueY.percent.formatNumber(\'#.0\')}% de {name}';
    series1.name = name;
    series1.dataFields.dateX = 'date';
    series1.dataFields.valueY = field;
    series1.tooltip.label.textAlign = 'middle';
    series1.stacked = true;
  }

}

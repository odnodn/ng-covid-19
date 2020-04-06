import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-chart-test-column',
  templateUrl: './coronavirus-chart-test-column.component.html',
  styleUrls: ['./coronavirus-chart-test-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusChartTestColumnComponent implements OnInit, AfterViewInit, OnDestroy {

  chart: am4charts.XYChart;
  choices: any[];
  dataType: string;
  series: am4charts.ColumnSeries;
  @Input() nameChart: string;
  @Input() data;
  constructor() { }

  ngOnInit(): void {
    this.dataType = 'total';
    this.choices = [
      { label: 'Total', value: 'total' },
      { label: 'Homme', value: 'men' },
      { label: 'Femme', value: 'women' },
    ];
  }

  ngAfterViewInit(): void {
    this.onSelectTypeChange();
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeChange(): void {
    if (this.nameChart !== 'chart-test-age') {
      if (this.dataType === 'total') {
        this.initChartTimeline('testTotalPositive', 'testTotalNegative');
      } else if (this.dataType === 'men') {
        this.initChartTimeline('testMenPositive', 'testMenNegative');
      } else if (this.dataType === 'women') {
        this.initChartTimeline('testWomenPositive', 'testWomenNegative');
      }
    } else {
      if (this.dataType === 'total') {
        this.initChartAgeTest('testTotalPositive', 'testTotalNegative');
      } else if (this.dataType === 'men') {
        this.initChartAgeTest('testMenPositive', 'testMenNegative');
      } else if (this.dataType === 'women') {
        this.initChartAgeTest('testWomenPositive', 'testWomenNegative');
      }
    }
  }

  private initChart(): void {
    this.chart = am4core.create(this.nameChart, am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.legend = new am4charts.Legend();

  }

  private initChartAgeTest(fieldPositive: string, fieldNegative: string): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries();
    this.createSeries(fieldPositive, 'Tests positifs', '#f9461c', 'age');
    this.createSeries(fieldNegative, 'Tests négatifs', 'whitesmoke', 'age');
    this.createTotalLabel();
  }

  private initChartTimeline(fieldPositive: string, fieldNegative: string): void {
    this.initChart();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous');
    this.createXSeries('date');
    this.createYSeries();
    this.createSeries(fieldPositive, 'Tests positifs', '#f9461c', 'date');
    this.createSeries(fieldNegative, 'Tests négatifs', 'whitesmoke', 'date');
    this.createTotalLabel();
  }

  private createTotalLabel(): void {
    const totalBullet = this.series.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -20;
    totalBullet.label.text = '{valueY.total}';
    totalBullet.label.hideOversized = true;
    totalBullet.label.fontSize = 13;
    totalBullet.label.padding(5, 10, 5, 10);
  }

  private createXSeries(type: string): void {
    if (type !== 'date') {
      const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'age';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.fontSize = 13;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.dy = 5;
    } else {
      const categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.fontSize = 13;
      categoryAxis.renderer.labels.template.dy = 5;
    }

  }

  private createYSeries(): void {
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = 13;
    valueAxis.title.text = 'Tests réalisés';
    valueAxis.calculateTotals = true;
    valueAxis.extraMax = 0.1;
  }

  private createSeries(field: string, name: string, color: string, xAxis: string): void {

    this.series = this.chart.series.push(new am4charts.ColumnSeries());
    this.series.columns.template.strokeOpacity = 0;
    this.series.columns.template.fill = am4core.color(color);
    this.series.columns.template.width = am4core.percent(75);
    this.series.columns.template.tooltipText =
      '{dateX} \n {valueY} {name} sur {valueY.total}';
    this.series.name = name;
    /* Opacity */
    this.series.columns.template.strokeOpacity = 0;

    /* Bar width */
    this.series.columns.template.width = am4core.percent(90);
    if (xAxis === 'age') {
      this.series.dataFields.categoryX = xAxis;
      const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = '{valueY}';
      labelBullet.fontSize = 12;
      labelBullet.locationY = 0.5;
      labelBullet.label.fill = am4core.color('black');
    } else {
      this.series.dataFields.dateX = xAxis;
      const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = '{valueY}';
      labelBullet.fontSize = 12;
      labelBullet.locationY = 0.5;
      labelBullet.label.fill = am4core.color('black');
    }
    this.series.dataFields.valueY = field;
    this.series.tooltip.label.textAlign = 'middle';
    this.series.stacked = true;
  }

}

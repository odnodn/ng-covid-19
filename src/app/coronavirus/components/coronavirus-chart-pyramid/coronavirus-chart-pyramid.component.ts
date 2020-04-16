import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-chart-pyramid',
  templateUrl: './coronavirus-chart-pyramid.component.html',
  styleUrls: ['./coronavirus-chart-pyramid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusChartPyramidComponent implements OnInit, OnDestroy {

  chart: am4charts.XYChart;
  series: am4charts.ColumnSeries;
  dataType = 'total';
  max: number;
  dataChart: any[];
  choices: any[];
  @Input() data;
  constructor() { }

  ngOnInit(): void {
    this.choices = [
      { label: 'Tests réalisés', value: 'total' },
      { label: 'Tests positifs', value: 'positif' }
    ];
    this.dataChart = this.data.filter((data) => data.age !== 'tous');
    this.initChart();
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }


  initChart(): void {
    this.chart = am4core.create('chart-pyramid', am4charts.XYChart);
    this.chart.padding(10, 0, 0, 0);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.data = this.dataChart;
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.fontSize = 14;
    this.chart.legend.reverseOrder = true;
    this.max = Math.max.apply(Math, this.dataChart.map((o) => o.testTotal));
    this.createYaxis();
    this.createWomenPyramid();
    this.createMenPyramid();
    this.chart.bottomAxesContainer.layout = 'horizontal';
    this.chart.legend.valueLabels.template.align = 'left';
    this.chart.legend.valueLabels.template.textAlign = 'end';
  }

  onSelectTypeChange(): void {
    this.chart.data = this.dataChart;
    this.chart.map.getKey('Homme').dataFields.valueX = 'testMenPositive';
    this.chart.map.getKey('Femme').dataFields.valueX = 'testWomenPositive';
    this.max = Math.max.apply(Math, this.dataChart.map((o) => o.testTotalPositive));
    if (this.dataType === 'total') {
      this.max = Math.max.apply(Math, this.dataChart.map((o) => o.testTotal));
      this.chart.map.getKey('Homme').dataFields.valueX = 'testMen';
      this.chart.map.getKey('Femme').dataFields.valueX = 'testWomen';
    }
    this.chart.map.getKey('HommeAxis').max = this.max;
    this.chart.map.getKey('FemmeAxis').max = this.max;
  }

  createYaxis(): void {
    const pyramidYAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    pyramidYAxis.dataFields.category = 'age';
    pyramidYAxis.renderer.minGridDistance = 10;
    pyramidYAxis.renderer.grid.template.location = 0;
    pyramidYAxis.title.text = 'Age';
    pyramidYAxis.fontSize = 13;

  }

  createMenPyramid(): void {
    const pyramidXAxisMale = this.chart.xAxes.push(new am4charts.ValueAxis());
    pyramidXAxisMale.min = 0;
    pyramidXAxisMale.max = this.max;
    pyramidXAxisMale.fontSize = 13;
    pyramidXAxisMale.id = 'HommeAxis';
    pyramidXAxisMale.renderer.inversed = true;

    const pyramidSeriesMale = this.chart.series.push(new am4charts.ColumnSeries());
    pyramidSeriesMale.dataFields.categoryY = 'age';
    pyramidSeriesMale.dataFields.valueX = 'testMen';
    pyramidSeriesMale.id = 'Homme';


    const menLabel = pyramidSeriesMale.bullets.push(new am4charts.LabelBullet());
    menLabel.label.text = '{valueX}';
    menLabel.label.hideOversized = false;
    menLabel.label.truncate = false;
    menLabel.label.horizontalCenter = 'left';
    menLabel.label.dx = -45;
    menLabel.label.fontSize = 13;

    pyramidSeriesMale.name = 'Homme';
    pyramidSeriesMale.xAxis = pyramidXAxisMale;
    pyramidSeriesMale.clustered = false;
    pyramidSeriesMale.columns.template.fill = am4core.color('#4a8cfd');
    pyramidSeriesMale.columns.template.strokeOpacity = 0;
    pyramidSeriesMale.columns.template.strokeWidth = 0;
  }

  createWomenPyramid(): void {
    const pyramidXAxisFemale = this.chart.xAxes.push(new am4charts.ValueAxis());
    pyramidXAxisFemale.min = 0;
    pyramidXAxisFemale.max = this.max;
    pyramidXAxisFemale.fontSize = 13;
    pyramidXAxisFemale.id = 'FemmeAxis';
    const pyramidSeriesFemale = this.chart.series.push(new am4charts.ColumnSeries());
    pyramidSeriesFemale.dataFields.categoryY = 'age';
    pyramidSeriesFemale.dataFields.valueX = 'testWomen';
    pyramidSeriesFemale.id = 'Femme';

    const womenLabel = pyramidSeriesFemale.bullets.push(new am4charts.LabelBullet());
    womenLabel.label.text = '{valueX}';
    womenLabel.label.hideOversized = false;
    womenLabel.label.truncate = false;
    womenLabel.label.horizontalCenter = 'right';
    womenLabel.label.fontSize = 13;
    womenLabel.label.dx = 45;

    pyramidSeriesFemale.name = 'Femme';
    pyramidSeriesFemale.xAxis = pyramidXAxisFemale;
    pyramidSeriesFemale.clustered = false;
    pyramidSeriesFemale.columns.template.fill = am4core.color('#fd5260');
    pyramidSeriesFemale.columns.template.strokeOpacity = 1;
    pyramidSeriesFemale.columns.template.strokeWidth = 0;

  }

}

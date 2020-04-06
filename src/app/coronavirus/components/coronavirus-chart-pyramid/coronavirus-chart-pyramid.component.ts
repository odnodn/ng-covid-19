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
  typeValueMen: string;
  typeValueWomen: string;
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
    this.onSelectTypeChange();
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }


  initChart(): void {
    this.chart = am4core.create('chart-pyramid', am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.data = this.dataChart;
    this.chart.legend = new am4charts.Legend();
    this.createYaxis();
    this.createMenPyramid();
    this.createWomenPyramid();
    this.chart.bottomAxesContainer.layout = 'horizontal';
  }

  onSelectTypeChange(): void {
    this.typeValueMen = 'testMenPositive';
    this.typeValueWomen = 'testWomenPositive';
    this.max = Math.max.apply(Math, this.dataChart.map((o) => o.testTotalPositive));
    if (this.dataType === 'total') {
      this.max = Math.max.apply(Math, this.dataChart.map((o) => o.testTotal));
      this.typeValueMen = 'testMen';
      this.typeValueWomen = 'testWomen';
    }
    this.initChart();
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
    pyramidXAxisMale.extraMax = 0.1;
    const pyramidSeriesMale = this.chart.series.push(new am4charts.ColumnSeries());
    pyramidSeriesMale.dataFields.categoryY = 'age';
    pyramidSeriesMale.dataFields.valueX = this.typeValueMen;
    pyramidXAxisMale.min = 0;
    pyramidXAxisMale.max = this.max;
    pyramidXAxisMale.fontSize = 13;

    const menLabel = pyramidSeriesMale.bullets.push(new am4charts.LabelBullet());
    menLabel.label.text = '{valueX}';
    menLabel.label.hideOversized = false;
    menLabel.label.truncate = false;
    menLabel.label.horizontalCenter = 'left';
    menLabel.label.dx = 10;
    menLabel.label.fontSize = 13;

    pyramidSeriesMale.name = 'Homme';
    pyramidSeriesMale.xAxis = pyramidXAxisMale;
    pyramidSeriesMale.clustered = false;
    pyramidSeriesMale.columns.template.fill = am4core.color('#4a8cfd');
    pyramidSeriesMale.columns.template.strokeOpacity = 0;
  }

  createWomenPyramid(): void {
    const pyramidXAxisFemale = this.chart.xAxes.push(new am4charts.ValueAxis());
    pyramidXAxisFemale.renderer.inversed = true;
    pyramidXAxisFemale.extraMax = 0.1;
    pyramidXAxisFemale.min = 0;
    pyramidXAxisFemale.max = this.max;
    pyramidXAxisFemale.fontSize = 13;

    const pyramidSeriesFemale = this.chart.series.push(new am4charts.ColumnSeries());
    pyramidSeriesFemale.dataFields.categoryY = 'age';
    pyramidSeriesFemale.dataFields.valueX = this.typeValueWomen;

    const womenLabel = pyramidSeriesFemale.bullets.push(new am4charts.LabelBullet());
    womenLabel.label.text = '{valueX}';
    womenLabel.label.hideOversized = false;
    womenLabel.label.truncate = false;
    womenLabel.label.horizontalCenter = 'right';
    womenLabel.label.fontSize = 13;
    womenLabel.label.dx = -10;
    pyramidSeriesFemale.name = 'Femme';
    pyramidSeriesFemale.xAxis = pyramidXAxisFemale;
    pyramidSeriesFemale.clustered = false;
    pyramidSeriesFemale.columns.template.fill = am4core.color('#fd5260');
    pyramidSeriesFemale.columns.template.strokeOpacity = 0;

  }

}

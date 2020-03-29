import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-coronavirus-chart-gender',
  templateUrl: './coronavirus-chart-gender.component.html',
  styleUrls: ['./coronavirus-chart-gender.component.scss']
})
export class CoronavirusChartGenderComponent implements OnInit {

  @Input() dataGender;
  dataType = 'hospital';
  menValue: number;
  womenValue: number;
  labelText: string;
  constructor() {
  }

  ngOnInit(): void {
    this.onSelectTypeChange();
  }


  onSelectTypeChange(): void {
    const chart = am4core.create('chartdiv', am4charts.PieChart);
    chart.responsive.enabled = true;
    this.labelText = 'Répartition des cas guéris selon le genre';
    this.menValue = this.dataGender.men.home;
    this.womenValue = this.dataGender.women.home;
    if (this.dataType === 'hospital') {
      this.menValue = this.dataGender.men.hospital;
      this.womenValue = this.dataGender.women.hospital;
      this.labelText = 'Répartition des cas en hospitalisation selon le genre';
    } else if (this.dataType === 'reanimation') {
      this.menValue = this.dataGender.men.reanimation;
      this.womenValue = this.dataGender.women.reanimation;
      this.labelText = 'Répartition des cas en réanimation selon le genre';
    } else if (this.dataType === 'deaths') {
      this.menValue = this.dataGender.men.deaths;
      this.womenValue = this.dataGender.women.reanimation;
      this.labelText = 'Répartition des décès selon le genre';
    }
    chart.data = [
      {
        gender: `Femme `,
        value: this.womenValue,
        color: am4core.color('#f9461c')
      },
      {
        gender: `Homme `,
        value: this.menValue,
        color: am4core.color('#0069cc')
      },

    ];

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'gender';
    // chart.innerRadius = am4core.percent(30);
    const as = pieSeries.slices.template.states.getKey('active');
    as.properties.shiftRadius = 0;
    pieSeries.slices.template.propertyFields.fill = 'color';
    pieSeries.alignLabels = false;
    // pieSeries.labels.template.bent = true;
    // pieSeries.labels.template.radius = -10;
    // pieSeries.labels.template.padding(0, 0, 0, 0);
    // pieSeries.labels.template.text = '{value.percent.formatNumber(\'#.0\')}%';
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color('white');
    pieSeries.ticks.template.disabled = true;
  }

}

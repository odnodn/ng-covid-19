import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-coronavirus-chart-age',
  templateUrl: './coronavirus-chart-age.component.html',
  styleUrls: ['./coronavirus-chart-age.component.scss']
})
export class CoronavirusChartAgeComponent implements OnInit {

  @Input() dataAge;
  dataType = 'hospital';
  labelText: string;
  constructor() { }

  ngOnInit(): void {
    this.onSelectTypeChange();
  }

  onSelectTypeChange(): void {
    const chart = am4core.create('chart-age', am4charts.PieChart);
    chart.responsive.enabled = true;
    this.labelText = 'Répartition des cas en hospitalisation selon l\'âge';
    if (this.dataType === 'passage') {
      this.labelText = 'Répartition des cas passés aux urgences selon l\'âge';
    } else if (this.dataType === 'medical') {
      this.labelText = 'Répartition des cas qui ont subit des actes médicaux selon l\'âge';
    }
    chart.data = [
      {
        age: `< 15 ans `,
        value: this.dataAge.A[this.dataType],
        color: am4core.color('#FFC971')
      },
      {
        age: `15-44 ans `,
        value: this.dataAge.B[this.dataType],
        color: am4core.color('#FFB627')
      },
      {
        age: `45-64 ans `,
        value: this.dataAge.C[this.dataType],
        color: am4core.color('#FF9505')
      },
      {
        age: `65-74 ans `,
        value: this.dataAge.D[this.dataType],
        color: am4core.color('#E2711D')
      },
      {
        age: `75 > `,
        value: this.dataAge.E[this.dataType],
        color: am4core.color('#CC5803')
      }
    ];
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'age';
    chart.innerRadius = am4core.percent(40);
    const as = pieSeries.slices.template.states.getKey('active');
    as.properties.shiftRadius = 0;
    pieSeries.slices.template.propertyFields.fill = 'color';
  }

}

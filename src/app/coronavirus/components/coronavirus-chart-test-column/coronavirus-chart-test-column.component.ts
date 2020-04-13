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
      { label: 'Hommes', value: 'men' },
      { label: 'Femmes', value: 'women' },
    ];
  }

  ngAfterViewInit(): void {
    if (this.nameChart === 'chart-test-age') {
      this.initChartAgeTest('testTotalPositive', 'testTotalNegative');
    } else if (this.nameChart === 'chart-timeline') {
      this.initChartTimeline('testTotalPositive', 'testTotalNegative');
    } else if (this.nameChart === 'chart-day') {
      this.initChartDay();
    } else if (this.nameChart === 'chart-urgences-passage' ||
      this.nameChart === 'chart-urgences-medical' ||
      this.nameChart === 'chart-urgences-hospital') {
      this.initChartEmergency();
    } else if (this.nameChart === 'chart-urgences-passage-gender') {
      this.initChartEmergencyGender();
    } else if (this.nameChart === 'chart-urgences-hospital-gender') {
      this.initChartEmergencyGenderHospital();
    } else if (this.nameChart === 'chart-urgences-passage-age') {
      this.initChartEmergencyAge();
    } else if (this.nameChart === 'chart-urgences-hospital-age') {
      this.initChartEmergencyHospitalAge();
    } else if (this.nameChart === 'chart-urgences-medical-age') {
      this.initChartMedicalAge();
    } else if (this.nameChart === 'chart-urgences-medical-gender') {
      this.initChartEmergencyGenderMedical();
    }
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeChange(): void {
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');

    if (this.nameChart === 'chart-timeline') {
      this.chart.data = this.data.timeline.filter((item) => item.age === 'tous');
    }
    if (this.dataType === 'total') {
      this.chart.map.getKey('testTotalPositive').dataFields.valueY = 'testTotalPositive';
      this.chart.map.getKey('testTotalNegative').dataFields.valueY = 'testTotalNegative';
    } else if (this.dataType === 'men') {
      this.chart.map.getKey('testTotalPositive').dataFields.valueY = 'testMenPositive';
      this.chart.map.getKey('testTotalNegative').dataFields.valueY = 'testMenNegative';
    } else if (this.dataType === 'women') {
      this.chart.map.getKey('testTotalPositive').dataFields.valueY = 'testWomenPositive';
      this.chart.map.getKey('testTotalNegative').dataFields.valueY = 'testWomenNegative';
    }
  }

  onSelectTypeChangeEmergency(): void {
    if (this.nameChart === 'chart-urgences-passage') {
      this.chart.map.getKey('passageCorona').dataFields.valueY = 'passageCorona';
      this.chart.map.getKey('passageNoCorona').dataFields.valueY = 'passageNoCorona';
      this.chart.map.getKey('passageCorona').name = 'Passages aux urgences pour suspicion de COVID-19';
      this.chart.map.getKey('passageNoCorona').name = 'Passages aux urgences pour non suspicion de COVID-19';
    } else if (this.nameChart === 'chart-urgences-hospital') {
      this.chart.map.getKey('passageCorona').dataFields.valueY = 'hospitalCorona';
      this.chart.map.getKey('passageNoCorona').dataFields.valueY = 'noHospitalCorona';
      this.chart.map.getKey('passageCorona').name = 'Hospitalisations parmi les passages aux urgences pour suspicion de COVID-19';
      this.chart.map.getKey('passageNoCorona').name = 'Non hospitalisations parmi les passages aux urgences pour suspicion de COVID-19';
    } else if (this.nameChart === 'chart-urgences-medical') {
      this.chart.map.getKey('passageCorona').dataFields.valueY = 'acteCorona';
      this.chart.map.getKey('passageNoCorona').dataFields.valueY = 'acteNoCorona';
      this.chart.map.getKey('passageCorona').name = 'Nombres d\'actes médicaux SOS Médecins pour suspicion de COVID-19';
      this.chart.map.getKey('passageNoCorona').name = 'Nombres d\'actes médicaux SOS Médecins pour non suspicion de COVID-19';
    }
  }

  private initChart(): void {
    this.chart = am4core.create(this.nameChart, am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.fontSize = 14;
    this.chart.padding(10, 0, 0, 0);
  }

  private initChartDay(): void {
    this.initChart();
    this.chart.data = this.data;
    this.createXSeries('date');
    this.createYSeries('Nombre de patiens');
    this.createSeries('hospital', 'Hospitalisations', '#F17D07', 'date');
    this.createSeries('reanimation', 'En réanimation', '#E95D0C', 'date');
    this.createSeries('deaths', 'Décès', '#f9461c', 'date');
    this.createSeries('recovered', 'Guéris', '#43D787', 'date');
    this.chart.cursor = new am4charts.XYCursor();
  }

  private initChartAgeTest(fieldPositive: string, fieldNegative: string): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries('Nombre de tests');
    this.createSeries(fieldPositive, 'Tests positifs', '#f9461c', 'age');
    this.createSeries(fieldNegative, 'Tests négatifs', 'whitesmoke', 'age');
    this.createTotalLabel();
  }

  private initChartTimeline(fieldPositive: string, fieldNegative: string): void {
    this.initChart();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous');
    this.createXSeries('date');
    this.createYSeries('Nombre de tests');
    this.createSeries(fieldPositive, 'Tests positifs', '#f9461c', 'date');
    this.createSeries(fieldNegative, 'Tests négatifs', 'whitesmoke', 'date');
    this.chart.cursor = new am4charts.XYCursor();
    this.createTotalLabel();
  }

  private initChartEmergency(): void {
    this.initChart();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous' &&
      new Date(item.date).getTime() >= new Date('2020-03-18').getTime());
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.chart.data.length; i++) {
      this.chart.data[i].passageNoCorona = this.chart.data[i].passageTotal - this.chart.data[i].passageCorona;
      this.chart.data[i].acteNoCorona = this.chart.data[i].acteTotal - this.chart.data[i].acteCorona;
      this.chart.data[i].noHospitalCorona = this.chart.data[i].passageCorona - this.chart.data[i].hospitalCorona;
    }
    this.createXSeries('date');

    let color = '';
    if (this.nameChart === 'chart-urgences-hospital') {
      color = '#ffbb00';
      this.createYSeries('Nombre d\'hospitalisations');
    } else if (this.nameChart === 'chart-urgences-passage') {
      color = '#F17D07';
      this.createYSeries('Nombre de passages aux urgences');
    } else {
      color = '#E95D0C';
      this.createYSeries('Nombre d\'actes médicaux SOS médecins');
    }
    this.createSeries('passageCorona', 'Passages aux urgences pour suspicion de COVID-19', color, 'date');
    this.createSeries('passageNoCorona', 'Passages aux urgences pour non suspicion de COVID-19', 'whitesmoke', 'date');
    this.chart.cursor = new am4charts.XYCursor();
    this.onSelectTypeChangeEmergency();
  }

  private initChartEmergencyGender(): void {
    this.initChart();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous' &&
      new Date(item.date).getTime() >= new Date('2020-03-18').getTime());
    this.createXSeries('date');
    this.createYSeries('Nombre de passages aux urgences');
    this.createSeries('passageCoronaHomme', 'Hommes', '#4a8cfd', 'date');
    this.createSeries('passageCoronaFemme', 'Femmes', '#fd5260', 'date');
    this.chart.cursor = new am4charts.XYCursor();
  }

  private initChartEmergencyGenderHospital(): void {
    this.initChart();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous' &&
      new Date(item.date).getTime() >= new Date('2020-03-18').getTime());
    this.createXSeries('date');
    this.createYSeries('Nombre d\'hospitalisations');
    this.createSeries('hospitalCoronaHomme', 'Hommes', '#4a8cfd', 'date');
    this.createSeries('hospitalCoronaFemme', 'Femmes', '#fd5260', 'date');
    this.chart.cursor = new am4charts.XYCursor();
  }

  private initChartEmergencyGenderMedical(): void {
    this.initChart();
    this.chart.data = this.data.timeline.filter((item) => item.age === 'tous' &&
      new Date(item.date).getTime() >= new Date('2020-03-18').getTime());
    this.createXSeries('date');
    this.createYSeries('Nombre d\'actes médicaux');
    this.createSeries('acteCoronaHomme', 'Hommes', '#4a8cfd', 'date');
    this.createSeries('acteCoronaFemme', 'Femmes', '#fd5260', 'date');
    this.chart.cursor = new am4charts.XYCursor();
  }

  private initChartEmergencyAge(): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries('Nombre de passages aux urgences');
    this.createSeries('passageCorona', 'Passages aux urgences', '#ffbb00', 'age');
  }

  private initChartEmergencyHospitalAge(): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries('Nombre d\'hospitalisations');
    this.createSeries('hospitalCorona', 'Hospitalisations parmi les passages aux urgences', '#F17D07', 'age');
  }

  private initChartMedicalAge(): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries('Nombre d\'actes médicaux');
    this.createSeries('acteCorona', 'Actes médicaux SOS Médécins', '#E95D0C', 'age');
  }


  private createTotalLabel(): void {
    const totalBullet = this.series.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -20;
    totalBullet.label.text = '{valueY.total}';
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 13;
  }

  private createXSeries(type: string): void {
    if (type !== 'date') {
      const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'age';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.fontSize = 13;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.dy = 5;
      categoryAxis.cursorTooltipEnabled = false;
    } else {
      const categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.fontSize = 13;
      categoryAxis.renderer.labels.template.dy = 5;
      categoryAxis.cursorTooltipEnabled = false;
    }

  }

  private createYSeries(name: string): void {
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = 13;
    valueAxis.title.text = name;
    valueAxis.calculateTotals = true;
    valueAxis.extraMax = 0.1;
    valueAxis.cursorTooltipEnabled = false;
  }

  private createSeries(field: string, name: string, color: string, xAxis: string): void {
    this.series = this.chart.series.push(new am4charts.ColumnSeries());
    this.series.columns.template.strokeOpacity = 0;
    this.series.columns.template.fill = am4core.color(color);
    this.series.columns.template.width = am4core.percent(75);
    if (this.nameChart === 'chart-day') {
      this.series.columns.template.tooltipText =
        '[bold]{dateX}[\] \n [bold] {valueY}[\] {name}';
      this.series.tooltip.getFillFromObject = false;
      this.series.tooltip.background.fill = am4core.color(color);
    }
    if (this.nameChart === 'chart-timeline') {
      this.series.columns.template.tooltipText =
        '[bold]{dateX}[\] \n [bold]{valueY} [\] {name} sur [bold]{valueY.total}[\]';
    }
    if (this.nameChart.includes('chart-urgences')) {
      if (field !== 'passageNoCorona') {
        this.series.columns.template.tooltipText =
          '[bold]{dateX}[\] \n [bold]{valueY} [\] {name}[\]';
        this.series.tooltip.label.textAlign = 'middle';
        this.series.tooltip.label.fontSize = 13;
        this.series.tooltip.getFillFromObject = false;
        this.series.tooltip.background.fill = am4core.color(color);
      }
    }
    this.series.tooltip.label.wrap = true;
    this.series.tooltip.label.width = 200;
    this.series.tooltip.label.textAlign = 'middle';
    this.series.tooltip.label.fontSize = 13;
    this.series.dataFields.valueY = field;
    this.series.name = name;
    this.series.id = field;
    /* Opacity */
    this.series.columns.template.strokeOpacity = 0;

    /* Bar width */
    this.series.columns.template.width = am4core.percent(90);
    if (xAxis === 'age') {
      this.series.dataFields.categoryX = xAxis;
      this.series.calculatePercent = true;
      const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
      // labelBullet.label.text = '{valueY}';
      labelBullet.fontSize = 12;
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;
      labelBullet.label.fill = am4core.color('black');
      labelBullet.label.textAlign = 'middle';
      if (this.nameChart.includes('chart-urgences')) {
        if (field !== 'passageNoCorona') {
          labelBullet.label.fill = am4core.color('white');

          labelBullet.label.text = '[bold]{valueY} \n {valueY.percent.formatNumber(\'#.\')}%[\]';
        }
      }
      if (this.nameChart === 'chart-test-age') {
        if (field !== 'testTotalNegative') {
          labelBullet.label.text = '[bold]{valueY}[\]';
          labelBullet.label.fill = am4core.color('white');
        }
      }
      if (this.nameChart === 'chart-timeline') {
        if (field !== 'testTotalNegative') {
          labelBullet.label.text = '[bold]{valueY}[\]';
          labelBullet.label.fill = am4core.color('white');
        }
      }
    } else {
      this.series.dataFields.dateX = xAxis;
      const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
      if (this.nameChart === 'chart-day') {
        labelBullet.label.text = '{valueY}';
      }
      if (this.nameChart.includes('chart-urgences')) {
        if (field !== 'passageNoCorona') {
          labelBullet.label.text = '[bold]{valueY.totalPercent.formatNumber(\'#.\')}%[\]';
        }
      }
      labelBullet.fontSize = 12;
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;
      labelBullet.label.fill = am4core.color('black');
      if (this.nameChart === 'chart-timeline') {
        if (field !== 'testTotalNegative') {
          labelBullet.label.text = '{valueY.totalPercent.formatNumber(\'#.\')}%';
          labelBullet.label.fill = am4core.color('white');
        }
      }
      if (this.nameChart.includes('chart-urgences')) {
        if (field !== 'passageNoCorona') {
          labelBullet.label.fill = am4core.color('white');
        }
      }
      if (this.nameChart === 'chart-day') {
        labelBullet.label.fill = am4core.color('white');
      }
    }

    this.series.tooltip.label.textAlign = 'middle';
    this.series.stacked = true;
  }

}

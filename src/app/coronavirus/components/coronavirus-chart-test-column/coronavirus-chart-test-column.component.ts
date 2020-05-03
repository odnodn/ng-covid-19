import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  title: string;
  @Input() nameChart: string;
  @Input() data;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  constructor() { }

  ngOnInit(): void {
    if (this.nameChart === 'chart-national-age') {
      this.dataType = 'deaths';
      this.choices = [
        { label: 'Hospitalisations en cours', value: 'hospital' },
        { label: 'Réanimations en cours', value: 'reanimation' },
        { label: 'Décès', value: 'deaths' },
        { label: 'Guéris', value: 'recovered' }
      ];
    } else if (this.nameChart === 'chart-test-age' || this.nameChart === 'chart-timeline') {
      this.dataType = 'total';
      this.choices = [
        { label: 'Total', value: 'total' },
        { label: 'Hommes', value: 'men' },
        { label: 'Femmes', value: 'women' },
      ];
    }
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
    } else if (this.nameChart === 'chart-national-age') {
      this.initChartAgeNationalStat();

    }
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeChange(): void {
    if (this.nameChart === 'chart-national-age') {
      const values = {
        hospital: {
          name: 'Hospitalisations en cours',
          color: '#F17D07',
          title: `Répartition des hospitalisations en cours selon l'âge`
        },
        reanimation: {
          name: 'Réanimations en cours',
          color: '#E95D0C',
          title: `Répartition des réanimations en cours selon l'âge`
        },
        recovered: {
          name: 'Guéris',
          color: '#43D787',
          title: `Répartition des guéris après hospitalisation selon l'âge`
        },
        deaths: {
          name: 'Décès',
          color: '#f9461c',
          title: `Répartition des décès après hospitalisation selon l'âge`
        }
      };
      this.chart.data = this.data.filter((item) => item.age !== 'tous');
      this.title = values[this.dataType].title;
      this.chart.map.getKey('deaths').name = values[this.dataType].name;
      this.chart.map.getKey('deaths').dataFields.valueY = this.dataType;
      this.chart.map.getKey('deaths').columns.template.fill = am4core.color(values[this.dataType].color);
      this.chart.map.getKey('deaths').tooltip.background.fill = am4core.color(values[this.dataType].color);
    } else {
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
      this.chart.map.getKey('passageNoCorona').name = 'Non hospitalisation parmi les passages aux urgences pour suspicion de COVID-19';
    } else if (this.nameChart === 'chart-urgences-medical') {
      this.chart.map.getKey('passageCorona').dataFields.valueY = 'acteCorona';
      this.chart.map.getKey('passageNoCorona').dataFields.valueY = 'acteNoCorona';
      this.chart.map.getKey('passageCorona').name = 'Nombres d\'actes médicaux SOS Médecins pour suspicion de COVID-19';
      this.chart.map.getKey('passageNoCorona').name = 'Nombres d\'actes médicaux SOS Médecins pour non suspicion de COVID-19';
    }
  }

  private initChart(): void {
    this.chart = am4core.create(this.chartElement.nativeElement, am4charts.XYChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = 'dd MMMM';
    if (this.nameChart !== 'chart-national-age') {
      this.chart.legend = new am4charts.Legend();
      this.chart.legend.fontSize = 14;
    }
    this.chart.padding(10, 0, 0, 0);
  }

  private initChartDay(): void {
    this.initChart();
    this.data.forEach((item) => {
      item.hospital = item.hospital - item.reanimation;
    })
    this.chart.data = this.data;
    this.createXSeries('date');
    this.createYSeries('Nombre de patients');
    this.createSeries('hospital', 'Autres hospitalisations', '#F17D07', 'date');
    this.createSeries('reanimation', 'Hospitalisations en réanimation', '#E95D0C', 'date');
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
      color = '#F17D07';
      this.createYSeries('Nombre d\'hospitalisations');
    } else if (this.nameChart === 'chart-urgences-passage') {
      color = '#ffbb00';
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
    this.createSeries('passageCorona', 'Passages aux urgences pour suspicion de COVID-19', '#ffbb00', 'age');
  }

  private initChartEmergencyHospitalAge(): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    for (let i = 0; i < this.chart.data.length; i++) {
      this.chart.data[i].hospitalNoCorona = this.chart.data[i].passageCorona - this.chart.data[i].hospitalCorona;
    }
    this.createXSeries('age');
    this.createYSeries('Nombre d\'hospitalisations');
    this.createSeries('hospitalCorona', 'Hospitalisations', '#F17D07', 'age');
    this.createSeries('hospitalNoCorona', 'Non hospitalisation', 'whitesmoke', 'age');
  }

  private initChartMedicalAge(): void {
    this.initChart();
    this.chart.data = this.data.total.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries('Nombre d\'actes médicaux');
    this.createSeries('acteCorona', 'Actes médicaux SOS Médécins', '#E95D0C', 'age');
  }

  private initChartAgeNationalStat(): void {
    this.initChart();
    this.chart.data = this.data.filter((item) => item.age !== 'tous');
    this.createXSeries('age');
    this.createYSeries('Nombre de patients');
    this.createSeries('deaths', 'Décès', '#f9461c', 'age');
    this.title = `Répartition des décès après hospitalisation selon l'âge`;
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
      categoryAxis.renderer.labels.template.rotation = 300;
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      categoryAxis.renderer.labels.template.horizontalCenter = 'middle';
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
    if (this.nameChart === 'chart-urgences-hospital-age') {
      valueAxis.calculateTotals = true;
    }
  }

  private customTooltip(field: string, color: string): void {
    if (field === 'testTotalNegative' || field === 'passageNoCorona' || field === 'hospitalNoCorona') {
      return;
    }

    this.series.tooltip.label.wrap = true;
    this.series.tooltip.label.width = 250;
    this.series.tooltip.pointerOrientation = 'vertical';
    this.series.tooltip.label.textAlign = 'middle';
    this.series.tooltip.label.fontSize = 13;
    // this.series.tooltip.
    if (this.nameChart === 'chart-day') {
      this.series.columns.template.tooltipText =
        '[bold]{dateX}[\] \n [bold] {valueY}[\] {name}';
      this.series.tooltip.getFillFromObject = false;
      this.series.tooltip.background.fill = am4core.color(color);
    }
    if (this.nameChart === 'chart-national-age') {
      this.series.columns.template.tooltipText = '[bold]{valueY} [\] {name} soit [bold]{valueY.percent.formatNumber(\'#.\')}% [\] chez les {categoryX} ans';
      this.series.tooltip.getFillFromObject = false;
      this.series.tooltip.background.fill = am4core.color(color);
    }
    if (this.nameChart.includes('chart-urgences')) {
      // tslint:disable-next-line:max-line-length
      this.series.columns.template.tooltipText = '[bold]{dateX}[\] \n [bold]{valueY} [\] {name} soit [bold]{valueY.totalPercent.formatNumber(\'#.\')}% [\]';
      if (this.nameChart === 'chart-urgences-hospital-age') {
        // tslint:disable-next-line:max-line-length
        this.series.columns.template.tooltipText = '[bold]{valueY} [\] {name} soit [bold]{valueY.totalPercent.formatNumber(\'#.\')}% [\] chez les {categoryX} ans';
      }
      if (this.nameChart === 'chart-urgences-medical-age' ||
        this.nameChart === 'chart-urgences-passage-age' ) {
        // tslint:disable-next-line:max-line-length
        this.series.columns.template.tooltipText = '[bold]{valueY} [\] {name} soit [bold]{valueY.percent.formatNumber(\'#.\')}% [\] chez les {categoryX} ans';
      }
      this.series.tooltip.getFillFromObject = false;
      this.series.tooltip.background.fill = am4core.color(color);
    }
    if (this.nameChart === 'chart-test-age' || this.nameChart === 'chart-timeline') {
      this.series.columns.template.tooltipText =
        '[bold]{dateX}[\] \n [bold]{valueY}[\] {name} soit [bold]{valueY.totalPercent.formatNumber(\'#.\')}%[\]';
    }
  }

  private customBulletAgeAxis(field: string): void {
    if (field === 'testTotalNegative' || field === 'passageNoCorona' || field === 'hospitalNoCorona') {
      return;
    }
    const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
    labelBullet.fontSize = 12;
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    labelBullet.label.fill = am4core.color('white');
    labelBullet.label.textAlign = 'middle';
    if (this.nameChart.includes('chart-urgences') || this.nameChart === 'chart-national-age') {
      this.series.calculatePercent = true;
      labelBullet.label.text = '[bold]{valueY} \n {valueY.percent.formatNumber(\'#.\')}%[\]';
      if (field === 'hospitalCorona') {
        labelBullet.label.text = '[bold]{valueY} \n {valueY.totalPercent.formatNumber(\'#.\')}%[\]';
      }
    }
    if (this.nameChart === 'chart-test-age') {
      labelBullet.label.text = '[bold]{valueY} \n {valueY.totalPercent.formatNumber(\'#.\')}%[\]';

    }
  }

  private customBulletDateAxis(field: string) {
    const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
    labelBullet.fontSize = 12;
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    labelBullet.label.fill = am4core.color('black');
    if (field === 'testTotalNegative' || field === 'passageNoCorona' || field === 'hospitalNoCorona') {
      return;
    }
    if (this.nameChart === 'chart-timeline') {
      this.series.calculatePercent = true;
      labelBullet.label.text = '[bold]{valueY}[\]';
      labelBullet.label.fill = am4core.color('white');
    }
    if (this.nameChart === 'chart-day') {
      labelBullet.label.text = '{valueY}';
    }
    if (this.nameChart.includes('chart-urgences')) {
      labelBullet.label.text = '[bold]{valueY.totalPercent.formatNumber(\'#.\')}%[\]';
    }
    if (this.nameChart === 'chart-timeline') {
      labelBullet.label.text = '{valueY.totalPercent.formatNumber(\'#.\')}%';
      labelBullet.label.fill = am4core.color('white');
    }
    if (this.nameChart.includes('chart-urgences') || this.nameChart === 'chart-day') {
      labelBullet.label.fill = am4core.color('white');
    }
  }

  private createSeries(field: string, name: string, color: string, xAxis: string): void {
    this.series = this.chart.series.push(new am4charts.ColumnSeries());
    this.series.showOnInit = false;
    this.series.columns.template.strokeOpacity = 1;
    this.series.columns.template.strokeWidth = 0;
    this.series.columns.template.fill = am4core.color(color);
    this.series.columns.template.width = am4core.percent(75);
    this.series.dataFields.valueY = field;

    this.series.name = name;
    this.series.id = field;

    this.customTooltip(field, color);
    /* Bar width */
    this.series.columns.template.width = am4core.percent(90);
    if (xAxis === 'age') {
      this.series.dataFields.categoryX = xAxis;
      this.customBulletAgeAxis(field);
    } else {
      this.series.dataFields.dateX = xAxis;
      this.customBulletDateAxis(field);
    }
    this.series.stacked = true;
  }

}

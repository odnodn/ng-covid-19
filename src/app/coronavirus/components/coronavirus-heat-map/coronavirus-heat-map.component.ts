import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_franceHigh from '@amcharts/amcharts4-geodata/franceHigh';
import am4geodata_franceDepartmentsHigh from '@amcharts/amcharts4-geodata/franceDepartmentsHigh';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-coronavirus-heat-map',
  templateUrl: './coronavirus-heat-map.component.html',
  styleUrls: ['./coronavirus-heat-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusHeatMapComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() selectedDate;
  @Input() selectedDivisionMap;
  @Input() selectedAge;
  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  imageSeries: am4maps.MapImageSeries;
  title: am4core.Label;
  circle: am4core.Circle;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  divisionMap = {
    world: am4geodata_worldLow,
    regionFrance: am4geodata_franceHigh,
    departmentFrance: am4geodata_franceDepartmentsHigh
  };
  isInitialized = false;
  colors = {
    1: '#fff596',
    2: '#ffdc07',
    3: '#ff8d00',
    4: '#ff0000',
    5 : '#c42615'
  };
  constructor() { }

  ngOnInit(): void {
    this.isInitialized = true;
    this.initMainMap();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (this.isInitialized === false) {
      return;
    }
    if (changes.selectedDivisionMap && changes.selectedDivisionMap.previousValue !== changes.selectedDivisionMap.currentValue) {
      this.chart.geodata = this.divisionMap[this.selectedDivisionMap];
      this.series.data = [];
    }
    this.initData();
  }

  private initMainMap(): void {
    this.chart = am4core.create('map', am4maps.MapChart);
    this.chart.tapTimeout = 5000;
    this.chart.tapToActivate = true;
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.geodata = this.divisionMap[this.selectedDivisionMap]; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    this.series.useGeodata = true;
    this.series.nonScalingStroke = true;
    this.series.strokeWidth = 0.5;
    const polygonTemplate = this.series.mapPolygons.template;
    polygonTemplate.propertyFields.fill = 'fill';
    polygonTemplate.tooltipText = '{name} \n {message} \n';
    polygonTemplate.stroke = am4core.color('#c1c1c1');
    polygonTemplate.strokeOpacity = 0.4;
    this.series.tooltip.label.textAlign = 'middle';
    // Configure series
    this.title = this.chart.chartContainer.createChild(am4core.Label);
    this.title.fontSize = 20;
    this.title.fontFamily = 'inherit';
    this.title.paddingTop = 8;
    this.title.paddingLeft = 8;
    this.title.align = 'left';
    this.title.zIndex = 100;
    // remove antarctique
    this.series.showOnInit = false;
    this.initData();
  }

  private initData(): void {
    const data = [];

    this.data.filter((item) => item.numberWeek === this.selectedDate && item.age === this.selectedAge).forEach((stat) => {
      const id = `FR-${stat.code}`;
      const itemMortality = {
        id,
        name: stat.translation,
        value: stat.score,
        message: this.getRateLegend(stat.score),
        fill: am4core.color(this.colors[stat.score])
      };
      data.push(itemMortality);
    });
    this.series.data = data;
  }

  private getRateLegend(score: string): string {
    if (score === '1') {
      return 'Pas d\'excès de décès';
    }
    if (score === '2') {
      return 'Excès modéré de décès';
    }
    if (score === '3') {
      return 'Excès élevé de décès';
    }
    if (score === '4') {
      return 'Excès très élevé de décès';
    }
    if (score === '5') {
      return 'Excès exceptionnel de décès';
    }
  }

}

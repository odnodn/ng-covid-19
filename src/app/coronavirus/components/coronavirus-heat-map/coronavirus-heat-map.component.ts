import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_franceHigh from '@amcharts/amcharts4-geodata/franceHigh';
import am4geodata_franceDepartmentsHigh from '@amcharts/amcharts4-geodata/franceDepartmentsHigh';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-heat-map',
  templateUrl: './coronavirus-heat-map.component.html',
  styleUrls: ['./coronavirus-heat-map.component.scss']
})
export class CoronavirusHeatMapComponent implements OnInit {

  @Input() data;
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
  selectedWeek = '2020-S11';
  constructor() { }

  ngOnInit(): void {
    this.selectedWeek = this.data[this.data.length - 1].numberWeek;
    this.initMainMap();
  }

  private initMainMap(): void {
    this.chart = am4core.create('map', am4maps.MapChart);
    this.chart.tapTimeout = 5000;
    this.chart.tapToActivate = true;
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.geodata = this.divisionMap.departmentFrance; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    this.series.useGeodata = true;
    this.series.nonScalingStroke = true;
    this.series.strokeWidth = 0.5;

    const polygonTemplate = this.series.mapPolygons.template;
    polygonTemplate.fill = am4core.color('#eeeeee');
    polygonTemplate.tooltipText = '{name} \n {message} \n Z-score : {value}  ';
    polygonTemplate.stroke = am4core.color('whitesmoke');
    this.series.tooltip.label.textAlign = 'middle';
    this.series.heatRules.push({
      property: 'fill',
      target: this.series.mapPolygons.template,
      min: am4core.color('#ffffd0'),
      max: am4core.color('#da2a01'),
      // logarithmic: true
    });
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
    this.data.filter((item) => item.numberWeek === this.selectedWeek && item.age === 'tous').forEach((stat) => {
      const id = `FR-${stat.code}`;
      const itemMortality = {
        id,
        name: stat.translation,
        value: stat.score,
        message: this.getRateLegend(stat.score)
      };
      data.push(itemMortality);
    });
    this.series.data = data;
  }

  private getRateLegend(score: number): string {
    if (score < 2) {
      return 'Pas d\'excès de décès';
    }
    if (score >= 2 && score < 5) {
      return 'Excès modéré de décès';
    }
    if (score >= 5 && score < 7) {
      return 'Excès élevé de décès';
    }
    if (score >= 7 && score < 12) {
      return 'Excès très élevé de décès';
    }
    if (score > 12) {
      return 'Excès exceptionnel de décès';
    }
  }

}

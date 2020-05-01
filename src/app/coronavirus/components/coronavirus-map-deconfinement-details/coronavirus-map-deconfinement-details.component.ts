import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_franceHigh from '@amcharts/amcharts4-geodata/franceHigh';
import am4geodata_franceDepartmentsHigh from '@amcharts/amcharts4-geodata/franceDepartmentsHigh';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';

@Component({
  selector: 'app-coronavirus-map-deconfinement-details',
  templateUrl: './coronavirus-map-deconfinement-details.component.html',
  styleUrls: ['./coronavirus-map-deconfinement-details.component.scss']
})
export class CoronavirusMapDeconfinementDetailsComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() selectedDate;

  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  imageSeries: am4maps.MapImageSeries;
  title: am4core.Label;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  isInitialized = false;
  constructor() { }

  ngOnInit(): void {
    this.initMainMap();
    this.isInitialized = true;
  }

  ngOnChanges(): void {
    if (this.isInitialized === true) {
      this.initData();
    }
  }

  private initMainMap(): void {
    this.chart = am4core.create('map', am4maps.MapChart);
    this.chart.tapTimeout = 5000;
    this.chart.tapToActivate = true;
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.geodata = am4geodata_franceDepartmentsHigh; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    this.series.useGeodata = true;
    this.series.nonScalingStroke = true;
    this.series.tooltip.background.cornerRadius = 0;
    this.series.tooltip.background.strokeOpacity = 1;
    this.series.tooltip.label.textAlign = 'middle';
    this.series.tooltip.label.fontSize = 14;
    this.series.tooltip.label.wrap = true;
    const polygonTemplate = this.series.mapPolygons.template;
    polygonTemplate.fill = am4core.color('#eeeeee');
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.stroke = am4core.color('whitesmoke');
    this.series.tooltip.label.textAlign = 'middle';
    polygonTemplate.propertyFields.fill = 'fill';
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
    const colors = {
      orange: '#fb0',
      vert: '#43d787',
      rouge: '#f9461c'
    }
    this.data.filter((item) => item.date === this.selectedDate).forEach((stat) => {
      const id = `FR-${stat.code}`;
      const itemMortality = {
        id,
        name: stat.translation,
        value: stat.color,
        fill: am4core.color(colors[stat.color])
      };
      data.push(itemMortality);
    });
    this.series.data = data;
  }


}

import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_franceDepartmentsHigh from '@amcharts/amcharts4-geodata/franceDepartmentsHigh';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coronavirus-map-measure',
  templateUrl: './coronavirus-map-measure.component.html',
  styleUrls: ['./coronavirus-map-measure.component.scss']
})
export class CoronavirusMapMeasureComponent implements OnInit, OnChanges {

  @Input() data;
  type = 'rZero';
  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  imageSeries: am4maps.MapImageSeries;
  title: am4core.Label;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  isInitialized = false;
  constructor(private datePipe: DatePipe) { }

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
    this.chart.tapTimeout = 5000;
    this.chart.tapToActivate = true;
    this.chart.numberFormatter.numberFormat = '#.00';
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
    polygonTemplate.tooltipText = '{name} {value} ';
    polygonTemplate.stroke = am4core.color('whitesmoke');
    this.series.tooltip.label.textAlign = 'middle';
    polygonTemplate.propertyFields.fill = 'fill';
    // Configure series
    this.title = this.chart.chartContainer.createChild(am4core.Label);
    this.title.fontSize = 22;
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
    this.data.forEach((stat) => {
      const id = `FR-${stat.code}`;
      let item = {};
      if (this.type === 'rZero') {
        item = {
          id,
          name: stat.translation,
          value: stat.rZero,
          fill: am4core.color(colors[stat.rZeroColor])
        };
        this.title.text = 'Carte du R0 au ' + this.datePipe.transform(stat.rZeroDate, 'd MMMM yyyy');
      }
      if (this.type === 'incidentRate') {
        item = {
          id,
          name: stat.translation,
          value: stat.incidentRate,
          fill: am4core.color(colors[stat.incidentRateColor])
        };
        this.title.text = 'Carte du taux d\'incidence au ' + this.datePipe.transform(stat.incidentRateDate, 'd MMMM yyyy');
      }
      if (this.type === 'reanimationCapacity') {
        item = {
          id,
          name: stat.translation,
          value: stat.reanimationCapacity,
          fill: am4core.color(colors[stat.reanimationCapacityColor])
        };
        this.title.text = 'Carte du taux d\'occupation des lits en réanimation au ' + this.datePipe.transform(stat.reanimationCapacityDate, 'd MMMM yyyy');
      }
      if (this.type === 'positiveRate') {
        item = {
          id,
          name: stat.translation,
          value: stat.positiveRate,
          fill: am4core.color(colors[stat.positiveRateColor])
        };
        this.title.text = 'Carte du taux de positivité des tests virologiques au ' +  this.datePipe.transform(stat.positiveRateDate, 'd MMMM yyyy');
      }

      data.push(item);
    });
    this.series.data = data;
  }

  onSelectTypeMap(): void {
    this.initData();
  }



}

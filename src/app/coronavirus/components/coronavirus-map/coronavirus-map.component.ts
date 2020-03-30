
import { Component, OnInit, OnDestroy, NgZone, Input, ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_franceHigh from '@amcharts/amcharts4-geodata/franceHigh';
import am4geodata_franceDepartmentsHigh from '@amcharts/amcharts4-geodata/franceDepartmentsHigh';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
am4core.useTheme(am4themes_animated);

export interface ThemeColor {
  min: string;
  max: string;
  fill: string;
  hover: string;
}

@Component({
  selector: 'app-coronavirus-map',
  templateUrl: './coronavirus-map.component.html',
  styleUrls: ['./coronavirus-map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapComponent implements OnInit, OnDestroy, OnChanges {

  @Input() detailedStats;
  @Input() selectedTypeMap;
  @Input() selectedDivisionMap;
  @Input() selectedCountry;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  isInitialized = false;
  availableMaps = ['cases', 'deaths', 'recovered'];

  maps = {
    cases: {
      colors: {
        fill: '#fff2ce',
        hover: '#FF8811',
        min: '#fff2ce',
        max: '#ffbb00'
      },
      title: 'Carte des cas confirmés',
      datas: [],
      label: 'cas confirmés'
    },
    recovered: {
      colors: {
        fill: '#bbd9c5',
        hover: '#48c774',
        min: '#bbd9c5',
        max: '#43D787'
      },
      title: 'Carte des cas guéris',
      datas: [],
      label: 'cas guéris'
    },
    deaths: {
      colors: {
        fill: '#ffdfe1',
        hover: '#E83D49',
        min: '#e8c0c3',
        max: '#f9461c'
      },
      title: 'Carte des décès',
      datas: [],
      label: 'décès'
    },
    hospital: {
      colors: {
        fill: '#fff2ce',
        hover: '#F17D07',
        min: '#fff2ce',
        max: '#F17D07'
      },
      title: 'Carte des cas en hospitalisation',
      datas: [],
      label: 'en hospitalisation'
    },
    reanimation: {
      colors: {
        fill: '#ffe8da',
        hover: '#E95D0C',
        min: '#ffe8da',
        max: '#E95D0C'
      },
      title: 'Carte des cas en réanimation',
      datas: [],
      label: 'en réanimation'
    }
  };

  divisionMap = {
    world: am4geodata_worldLow,
    regionFrance: am4geodata_franceHigh,
    departmentFrance: am4geodata_franceDepartmentsHigh
  };

  constructor() {
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.initMainMap();
    this.initDatas();
    this.updateMap();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (this.isInitialized === false) {
      return;
    }
    if (changes.selectedDivisionMap && changes.selectedDivisionMap.previousValue !== changes.selectedDivisionMap.currentValue) {
      this.chart.geodata = this.divisionMap[this.selectedDivisionMap];
      this.initDatas();
    }
    this.updateMap();
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return ;
    }
    this.chart.dispose();
  }

  private initDatas(): any {
    if (!this.detailedStats.length) { // One country
      this.detailedStats = [this.detailedStats];
    }
    let id = '';
    this.maps.cases.datas = [];
    this.maps.deaths.datas = [];
    this.maps.recovered.datas = [];
    this.maps.hospital.datas = [];
    this.maps.reanimation.datas = [];
    this.detailedStats.forEach((stat) => {
      id = this.selectedCountry.country === 'France' ? `FR-${stat.code}` : stat.code;
      this.maps.cases.datas = [{
        id,
        value: stat.cases
      }, ...this.maps.cases.datas];
      this.maps.deaths.datas = [{
        id,
        value: stat.deaths
      }, ...this.maps.deaths.datas];
      this.maps.recovered.datas = [{
        id,
        value: stat.deaths
      }, ...this.maps.recovered.datas];
      if (this.selectedCountry.country === 'France') {
        this.maps.hospital.datas = [{
          id,
          value: stat.hospital
        }, ...this.maps.hospital.datas];
        this.maps.reanimation.datas = [{
          id,
          value: stat.hospital
        }, ...this.maps.reanimation.datas];
      }
    });
  }

  private updateMap(): void { // A chq ngOnChanges
    this.polygonTemplate.fill = am4core.color(this.maps[this.selectedTypeMap].colors.fill);
    this.series.data = this.maps[this.selectedTypeMap].datas;
    this.series.heatRules.push({
      property: 'fill',
      target: this.series.mapPolygons.template,
      min: am4core.color(this.maps[this.selectedTypeMap].colors.min),
      max: am4core.color(this.maps[this.selectedTypeMap].colors.max)
    });
    this.polygonTemplate.tooltipText = '{name} {value} ' + this.maps[this.selectedTypeMap].label;
  }

  private initMainMap(): void {
    this.chart = am4core.create(this.chartElement.nativeElement, am4maps.MapChart);
    this.chart.geodata = this.divisionMap[this.selectedDivisionMap]; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    this.series.useGeodata = true;
    this.series.dataFields.zoomLevel = 'zoomLevel';
    this.series.dataFields.zoomGeoPoint = 'zoomGeoPoint';

    this.polygonTemplate = this.series.mapPolygons.template;
    if (this.countryNotZoom()) {
      this.chart.events.on('ready', () => {
        const target = this.series.getPolygonById(this.selectedCountry.code);
        this.chart.zoomToMapObject(target);
      });
    }
    // remove antarctique
    this.series.exclude = ['AQ'];
  }

  private countryNotZoom(): boolean {
    return this.selectedCountry.country !== 'Monde' && this.selectedCountry.country !== 'France';
  }

}

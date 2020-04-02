
import {
  Component, OnInit, OnDestroy, OnChanges,
  ViewChild, ElementRef, SimpleChange, Input, ChangeDetectionStrategy
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_franceHigh from '@amcharts/amcharts4-geodata/franceHigh';
import am4geodata_franceDepartmentsHigh from '@amcharts/amcharts4-geodata/franceDepartmentsHigh';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
import am4lang_fr_FR from '@amcharts/amcharts4/lang/fr_FR';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapComponent implements OnInit, OnDestroy, OnChanges {

  @Input() detailedStats;
  @Input() selectedDivisionMap;
  @Input() selectedCountry;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  imageSeries: am4maps.MapImageSeries;
  title: am4core.Label;
  circle: am4core.Circle;
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
        min: '#e2fdef',
        max: '#43D787'
      },
      title: 'Carte des cas guéris',
      datas: [],
      label: 'guéris'
    },
    deaths: {
      colors: {
        fill: '#ffdfe1',
        hover: '#E83D49',
        min: '#fff1ee',
        max: '#f9461c'
      },
      title: 'Carte des décès',
      datas: [],
      label: 'décès'
    },
    hospital: {
      colors: {
        fill: '#ffffff',
        hover: '#F17D07',
        min: '#fff8f0',
        max: '#F17D07'
      },
      title: 'Carte des hospitalisations en cours',
      datas: [],
      label: 'hospitalisations en cours'
    },
    reanimation: {
      colors: {
        fill: '#ffe8da',
        hover: '#E95D0C',
        min: '#fff1e9',
        max: '#E95D0C'
      },
      title: 'Carte des réanimations en cours',
      datas: [],
      label: 'réanimations en cours'
    }
  };

  divisionMap = {
    world: am4geodata_worldLow,
    regionFrance: am4geodata_franceHigh,
    departmentFrance: am4geodata_franceDepartmentsHigh
  };
  selectedTypeMap = 'cases';
  constructor() {
  }

  ngOnInit(): void {
    if (this.selectedCountry.country === 'France') {
      this.selectedTypeMap = 'hospital';
    }
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
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeMap(): void {
    this.updateMap();
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
      if (stat.code !== 'GP' && stat.code !== 'MQ' && stat.code !== 'GF' && stat.code !== 'RE' && stat.code !== 'YT') {
        this.maps.cases.datas = [{
          id,
          name: stat.translation,
          value: stat.cases,
          color: this.maps.cases.colors.max
        }, ...this.maps.cases.datas];
        this.maps.deaths.datas = [{
          id,
          name: stat.translation,
          value: stat.deaths,
          color: this.maps.deaths.colors.max
        }, ...this.maps.deaths.datas];
        this.maps.recovered.datas = [{
          id,
          name: stat.translation,
          value: stat.recovered,
          color: this.maps.recovered.colors.max
        }, ...this.maps.recovered.datas];
        if (this.selectedCountry.country === 'France') {
          this.maps.hospital.datas = [{
            id,
            name: stat.translation,
            value: stat.hospital,
            color: this.maps.hospital.colors.max
          }, ...this.maps.hospital.datas];
          this.maps.reanimation.datas = [{
            id,
            name: stat.translation,
            value: stat.reanimation,
            color: this.maps.reanimation.colors.max
          }, ...this.maps.reanimation.datas];
        }
      }
    
    });
  }

  private updateMap(): void { // A chq ngOnChanges
    this.imageSeries.data = this.maps[this.selectedTypeMap].datas;
    this.title.text = this.maps[this.selectedTypeMap].title;
    this.imageSeries.tooltip.background.fill = am4core.color(this.maps[this.selectedTypeMap].colors.max);
    this.circle.tooltipText = "{name} [bold]\n{value}[\] " + this.maps[this.selectedTypeMap].label;

  }

  private initMainMap(): void {
    this.chart = am4core.create(this.chartElement.nativeElement, am4maps.MapChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.geodata = this.divisionMap[this.selectedDivisionMap]; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    var polygonTemplate = this.series.mapPolygons.template;
    polygonTemplate.fill = am4core.color("#eeeeee");
    this.series.useGeodata = true;
    this.series.nonScalingStroke = true;
    this.series.dataFields.zoomLevel = 'zoomLevel';
    this.series.dataFields.zoomGeoPoint = 'zoomGeoPoint';
    this.series.strokeWidth = 0.5;
    this.series.calculateVisualCenter = true;
    this.title = this.chart.chartContainer.createChild(am4core.Label);
    this.title.fontSize = 20;
    this.title.fontFamily = 'inherit';
    this.title.paddingTop = 8;
    this.title.paddingLeft = 8;
    this.title.align = 'left';
    this.title.zIndex = 100;
    if (this.countryNotZoom()) {
      this.chart.events.on('ready', () => {
        const target = this.series.getPolygonById(this.selectedCountry.code);
        this.chart.zoomToMapObject(target);
      });
    }
    // remove antarctique
    this.series.exclude = ['AQ'];
    this.imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
    this.imageSeries.dataFields.value = "value";
    const imageTemplate = this.imageSeries.mapImages.template;

    imageTemplate.nonScaling = true
    imageTemplate.adapter.add("latitude", (latitude: any, target: any) => {
      const polygon = this.series.getPolygonById(target.dataItem.dataContext.id);
      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    })

    imageTemplate.adapter.add("longitude", (longitude: any, target: any) => {
      var polygon = this.series.getPolygonById(target.dataItem.dataContext.id);
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    });
    this.circle = imageTemplate.createChild(am4core.Circle);
    this.circle.fillOpacity = 0.7;
    this.circle.propertyFields.fill = "color";
    this.imageSeries.tooltip.getFillFromObject = false;
    this.imageSeries.tooltip.background.cornerRadius = 0;
    this.imageSeries.tooltip.background.strokeOpacity = 0;
    this.imageSeries.tooltip.label.textAlign = 'middle';
    this.imageSeries.tooltip.label.textValign = 'middle';
    this.imageSeries.tooltip.label.fontSize = 14;


    this.imageSeries.heatRules.push({
      target: this.circle,
      property: "radius",
      min: 4,
      max: 40,
      dataField: "value"
    })
  }

  private countryNotZoom(): boolean {
    return this.selectedCountry.country !== 'Monde' && this.selectedCountry.country !== 'France';
  }

}


import { Component, OnInit, OnDestroy, NgZone, Input, ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_franceHigh from '@amcharts/amcharts4-geodata/franceHigh';
import { FRANCE_REGIONS } from '@coronavirus/constants/france.constants';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapComponent implements OnInit, OnDestroy, OnChanges {

  @Input() detailedStats;
  @Input() selectedTypeMap;
  @Input() selectedCountry;
  chart: am4maps.MapChart;
  chartDatas: any = [];
  chartDatasCases: any[] = [];
  chartDatasDeaths: any[] = [];
  chartDatasRecovered: any[] = [];
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;

  constructor(
    private readonly zone: NgZone
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.selectedCountry.country !== 'France') {
      this.initMapWorld();
      return;
    }
    this.initMapFrance();
  }

  private getDatasFrance(type: string): any {
    const chartDatas: any[] = [];
    FRANCE_REGIONS.forEach((regionItem) => {
      const regionStats = this.detailedStats.statsByDepartment.filter((statsDepItem) => statsDepItem.region.code === regionItem.code);
      let value = 0;
      if (type === 'hospital') {
        value = regionStats.reduce((total, obj) => obj.hospital + total, 0);
      } else if (type === 'reanimation') {
        value = regionStats.reduce((total, obj) => obj.reanimation + total, 0);
      } else if (type === 'deaths') {
        value = regionStats.reduce((total, obj) => obj.deaths + total, 0);
      } else if (type === 'recovered') {
        value = regionStats.reduce((total, obj) => obj.home + total, 0);
      }
      chartDatas.push({
        id: regionItem.code,
        value
      });
    });
    return chartDatas;
  }

  private initMapFrance(): void {
    const chart = am4core.create(this.chartElement.nativeElement, am4maps.MapChart);
    chart.responsive.enabled = true;
    chart.geodata = am4geodata_franceHigh;
    chart.projection = new am4maps.projections.Miller();
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    const polygonTemplate = polygonSeries.mapPolygons.template;
    const hs = polygonTemplate.states.create('hover');
    const label = chart.chartContainer.createChild(am4core.Label);
    label.fontSize = 20;
    label.align = 'right';
    label.paddingTop = 20;
    label.paddingRight = 20;
    label.zIndex = 100;
    if (this.selectedTypeMap === 'hospital') {
      const chartDatas = this.getDatasFrance('hospital');
      const colors: ThemeColor = {
        fill: '#fff2ce',
        hover: '#F17D07',
        min: '#fff2ce',
        max: '#F17D07'
      };
      label.text = 'Carte des cas hospitalisés';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'hospitalisés');
    } else if (this.selectedTypeMap === 'deaths') {
      const chartDatas = this.getDatasFrance('deaths');
      const colors: ThemeColor = {
        fill: '#ffdfe1',
        hover: '#E83D49',
        min: '#e8c0c3',
        max: '#f9461c'
      };
      label.text = 'Carte des décès';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'morts');
    } else if (this.selectedTypeMap === 'recovered') {
      const chartDatas = this.getDatasFrance('recovered');
      const colors: ThemeColor = {
        fill: '#bbd9c5',
        hover: '#48c774',
        min: '#bbd9c5',
        max: '#43D787'
      };
      label.text = 'Carte des cas guéris';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'guéris');
    } else if (this.selectedTypeMap === 'reanimation') {
      const chartDatas = this.getDatasFrance('reanimation');
      const colors: ThemeColor = {
        fill: '#ffe8da',
        hover: '#E95D0C',
        min: '#ffe8da',
        max: '#E95D0C'
      };
      label.text = 'Carte des cas en réanimation';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'en réanimation');
    }
    this.chart = chart;
  }

  private getDatasWorld(type: string): any {
    const chartDatas = [];
    if (!this.detailedStats.length) {
      this.detailedStats = [this.detailedStats];
    }
    this.detailedStats.forEach((stat) => {
      let value = 0;
      if (type === 'cases') {
        value = stat.cases;
      } else if (type === 'deaths') {
        value = stat.deaths;
      } else if (type === 'recovered') {
        value = stat.recovered;
      }
      chartDatas.push({
        id: stat.code,
        value
      });
    });
    return chartDatas;
  }

  private initMapWorld(): void {
    const chart = am4core.create(this.chartElement.nativeElement, am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.geodataNames = am4geodata_lang_FR;
    chart.projection = new am4maps.projections.Miller();
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.dataFields.zoomLevel = 'zoomLevel';
    polygonSeries.dataFields.zoomGeoPoint = 'zoomGeoPoint';
    const label = chart.chartContainer.createChild(am4core.Label);
    label.fontSize = 20;
    label.align = 'right';
    label.zIndex = 100;
    label.paddingTop = 20;
    label.paddingRight = 20;
    const polygonTemplate = polygonSeries.mapPolygons.template;
    const hs = polygonTemplate.states.create('hover');
    if (this.selectedCountry.country !== 'Monde') {
      chart.events.on('ready', () => {
        const target = polygonSeries.getPolygonById(this.selectedCountry.code);
        chart.zoomToMapObject(target);
      });
    }
    if (this.selectedTypeMap === 'cases') {
      const chartDatas = this.getDatasWorld('cases');
      const colors: ThemeColor = {
        fill: '#fff2ce',
        hover: '#FF8811',
        min: '#fff2ce',
        max: '#ffbb00'
      };
      label.text = 'Carte des cas confirmés';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'confirmés');
    } else if (this.selectedTypeMap === 'deaths') {
      const chartDatas = this.getDatasWorld('deaths');
      const colors: ThemeColor = {
        fill: '#ffdfe1',
        hover: '#E83D49',
        min: '#e8c0c3',
        max: '#f9461c'
      };
      label.text = 'Carte des décès';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'morts');
    } else {
      const chartDatas = this.getDatasWorld('recovered');
      const colors: ThemeColor = {
        fill: '#bbd9c5',
        hover: '#48c774',
        min: '#bbd9c5',
        max: '#43D787'
      };
      label.text = 'Carte des cas guéris';
      this.initMap(polygonTemplate, polygonSeries, hs, colors, chartDatas, 'guéris');
    }
    // remove antarctique
    polygonSeries.exclude = ['AQ'];
    this.chart = chart;
  }

  private initMap(polygonTemplate: any, polygonSeries: any, hs: any, colors: ThemeColor, datas: any[], type: string) {
    polygonTemplate.fill = am4core.color(colors.fill);
    // Create hover state and set alternative fill color
    hs.properties.fill = am4core.color(colors.hover);
    polygonSeries.data = datas;
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color(colors.min),
      max: am4core.color(colors.max)
    });
    polygonTemplate.tooltipText = '{name} {value} ' + type;
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}

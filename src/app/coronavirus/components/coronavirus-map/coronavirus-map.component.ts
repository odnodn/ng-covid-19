import {
  Component, OnInit, OnDestroy, OnChanges,
  ViewChild, ElementRef, SimpleChange, Input, ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit
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
export class CoronavirusMapComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() detailedStats;
  @Input() selectedDivisionMap;
  @Input() selectedCountry;
  @Input() selectedTypeData;
  @ViewChild('chartElement', { static: true }) chartElement: ElementRef<HTMLElement>;
  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  imageSeries: am4maps.MapImageSeries;
  title: am4core.Label;
  circle: am4core.Circle;
  isInitialized = false;
  availableMaps = ['cases', 'deaths', 'recovered'];
  @Output() readonly selectTypeMapEvent: EventEmitter<string> = new EventEmitter<string>(true);

  maps = {
    cases: {
      colors: {
        max: '#ffbb00'
      },
      title: 'Cartographie des cas confirmés',
      datas: [],
      label: 'cas confirmés',
      tooltipText: '{name} [bold]\n{value}[\] cas confirmés'
    },
    active: {
      colors: {
        max: '#F17D07'
      },
      title: 'Cartographie des cas actifs',
      datas: [],
      label: 'cas actifs',
      tooltipText: '{name} [bold]\n{value}[\] cas actifs'
    },
    critical: {
      colors: {
        max: '#E95D0C'
      },
      title: 'Cartographie des cas critiques',
      datas: [],
      label: 'cas critiques',
      tooltipText: '{name} [bold]\n{value}[\] cas critiques'
    },
    recovered: {
      colors: {
        max: '#43D787'
      },
      title: 'Cartographie des cas guéris',
      datas: [],
      label: 'guéris',
      tooltipText: '{name} [bold]\n{value}[\] guéris'
    },
    deaths: {
      colors: {
        max: '#f9461c'
      },
      title: 'Cartographie des décès',
      datas: [],
      label: 'décès',
      tooltipText: '{name} [bold]\n{value}[\] décès'
    },
    hospital: {
      colors: {
        max: '#F17D07'
      },
      title: 'Cartographie des hospitalisations en cours',
      datas: [],
      label: 'hospitalisations en cours',
      tooltipText: '{name} [bold]\n{value}[\] hospitalisations en cours'
    },
    reanimation: {
      colors: {
        max: '#E95D0C'
      },
      title: 'Cartographie des réanimations en cours',
      datas: [],
      label: 'réanimations en cours',
      tooltipText: '{name} [bold]\n{value}[\] réanimations en cours'
    },
    ageAll: {
      colors: {
        max: '#f9461c'
      },
      title: 'Cartographie des tests de dépistage',
      datas: [],
      label: 'Tests de dépistages',
      tooltipText: '{name} \n[bold]{value}[\] tests au total\n [bold]{testTotalPositive}[\] tests positifs au total \n'
        + '[bold]{testMen}[\] tests chez les hommes\n' + '[bold]{testMenPositive}[\] tests positifs chez les hommes\n' +
        '[bold]{testWomen}[\] tests chez les femmes\n' + '[bold]{testWomenPositive}[\] tests positifs chez les femmes\n'
    },
    ageA: {
      colors: {
        max: '#f9461c'
      },
      title: 'Cartographie des tests de dépistage chez les moins de 15 ans',
      datas: [],
      label: 'Tests de dépistages',
      tooltipText: '{name} \n[bold]{value}[\] tests au total\n [bold]{testTotalPositive}[\] tests positifs au total \n'
        + '[bold]{testMen}[\] tests chez les hommes\n' + '[bold]{testMenPositive}[\] tests positifs chez les hommes\n' +
        '[bold]{testWomen}[\] tests chez les femmes\n' + '[bold]{testWomenPositive}[\] tests positifs chez les femmes\n'
    },
    ageB: {
      colors: {
        max: '#f9461c'
      },
      title: 'Cartographie des tests de dépistage chez les 15-44 ans',
      datas: [],
      label: 'Tests de dépistages',
      tooltipText: '{name} \n[bold]{value}[\] tests au total\n [bold]{testTotalPositive}[\] tests positifs au total \n'
        + '[bold]{testMen}[\] tests chez les hommes\n' + '[bold]{testMenPositive}[\] tests positifs chez les hommes\n' +
        '[bold]{testWomen}[\] tests chez les femmes\n' + '[bold]{testWomenPositive}[\] tests positifs chez les femmes\n'
    },
    ageC: {
      colors: {
        max: '#f9461c'
      },
      title: 'Cartographie des tests de dépistage chez les 45-64 ans',
      datas: [],
      label: 'Tests de dépistages',
      tooltipText: '{name} \n[bold]{value}[\] tests au total\n [bold]{testTotalPositive}[\] tests positifs au total \n'
        + '[bold]{testMen}[\] tests chez les hommes\n' + '[bold]{testMenPositive}[\] tests positifs chez les hommes\n' +
        '[bold]{testWomen}[\] tests chez les femmes\n' + '[bold]{testWomenPositive}[\] tests positifs chez les femmes\n'
    },
    ageD: {
      colors: {
        max: '#f9461c'
      },
      title: 'Cartographie des tests de dépistage chez les 65-74 ans',
      datas: [],
      label: 'Tests de dépistages',
      tooltipText: '{name} \n[bold]{value}[\] tests au total\n [bold]{testTotalPositive}[\] tests positifs au total \n'
        + '[bold]{testMen}[\] tests chez les hommes\n' + '[bold]{testMenPositive}[\] tests positifs chez les hommes\n' +
        '[bold]{testWomen}[\] tests chez les femmes\n' + '[bold]{testWomenPositive}[\] tests positifs chez les femmes\n'
    },
    ageE: {
      colors: {
        max: '#f9461c'
      },
      title: 'Carte des tests de dépistage chez les plus de 75 ans',
      datas: [],
      label: 'Tests de dépistages',
      tooltipText: '{name} \n[bold]{value}[\] tests au total\n [bold]{testTotalPositive}[\] tests positifs au total \n'
        + '[bold]{testMen}[\] tests chez les hommes\n' + '[bold]{testMenPositive}[\] tests positifs chez les hommes\n' +
        '[bold]{testWomen}[\] tests chez les femmes\n' + '[bold]{testWomenPositive}[\] tests positifs chez les femmes\n'
    },
    passageCorona: {
      colors: {
        max: '#ffbb00'
      },
      title: 'Cartographie des passages aux urgences pour suspicion de COVID-19',
      datas: [],
      label: 'Passages aux urgences pour suspicion de COVID-19',
      tooltipText: '{name} [bold]\n{value}[\] passages aux urgences pour suspicion de COVID-19'
    },
    hospitalCorona: {
      colors: {
        max: '#F17D07'
      },
      title: 'Cartographie des hospitalisations parmi les passages aux urgences pour suspicion de COVID-19',
      datas: [],
      label: 'Hospitalisations parmi les passages aux urgences pour suspicion de COVID-19',
      tooltipText: '{name} [bold]\n{value}[\] hopistalisations parmi les passages aux urgences pour suspicion de COVID-19'
    },
    acteCorona: {
      colors: {
        max: '#E95D0C'
      },
      title: 'Cartographie des actes médicaux SOS médecins pour suspicion de COVID-19',
      datas: [],
      label: 'Actes médicaux SOS médecins pour suspicion de COVID-19',
      tooltipText: '{name} [bold]\n{value}[\] actes médicaux SOS médecins pour suspicion de COVID-19'
    },
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
    if (this.selectedTypeData === 'test') {
      this.selectedTypeMap = 'ageAll';
    }
    if (this.selectedTypeData === 'emergency') {
      this.selectedTypeMap = 'passageCorona';
    }
    this.isInitialized = true;
  }

  ngAfterViewInit(): void {
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
      this.resetDatas();
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
    this.selectTypeMapEvent.emit(this.selectedTypeMap);
  }

  private initDatas(): any {
    if (!this.detailedStats.length) { // One country
      this.detailedStats = [this.detailedStats];
    }

    this.detailedStats.forEach((stat) => {
      const id = this.selectedCountry.country === 'France' ? `FR-${stat.code}` : stat.code;
      if (this.selectedTypeData === 'test') {
        this.initDataTest(id, stat);
      } else if (this.selectedTypeData === 'emergency') {
        this.initDataEmergency(id, stat);
      } else {
        this.iniDataGlobal(stat, id);
      }
    });
  }

  private resetDatas(): void {
    for (const key in this.maps) {
      if (this.maps[key].datas.length > 0) {
        this.maps[key].datas = [];
      }
    }
  }

  private iniDataGlobal(stat: any, id: string): void {
    for (const key in this.maps) {
      if (stat[key]) {
        this.maps[key].datas = [{
          id,
          name: stat.translation,
          value: stat[key],
          color: this.maps[key].colors.max
        }, ...this.maps[key].datas];
      }
    }
  }

  private initDataTest(id: string, stat: any): void {
    const age = {
      tous: 'ageAll',
      '-15': 'ageA',
      '15-44': 'ageB',
      '45-64': 'ageC',
      '65-74': 'ageD',
      '75+': 'ageE'
    };
    this.maps[age[stat.age]].datas = [{
      id,
      name: stat.translation,
      value: stat.testTotal,
      testTotalPositive: stat.testTotalPositive,
      testMen: stat.testMen,
      testMenPositive: stat.testMenPositive,
      testWomen: stat.testWomen,
      testWomenPositive: stat.testWomenPositive,
      color: this.maps[age[stat.age]].colors.max
    }, ...this.maps[age[stat.age]].datas];
  }

  private initDataEmergency(id: string, stat: any): void {
    this.maps.passageCorona.datas = [{
      id,
      name: stat.translation,
      value: stat.passageCorona,
      color: this.maps.passageCorona.colors.max
    }, ...this.maps.passageCorona.datas];
    this.maps.hospitalCorona.datas = [{
      id,
      name: stat.translation,
      value: stat.hospitalCorona,
      color: this.maps.hospitalCorona.colors.max
    }, ...this.maps.hospitalCorona.datas];
    this.maps.acteCorona.datas = [{
      id,
      name: stat.translation,
      value: stat.acteCorona,
      color: this.maps.acteCorona.colors.max
    }, ...this.maps.acteCorona.datas];
  }

  private updateMap(): void { // A chq ngOnChanges
    this.imageSeries.data = this.maps[this.selectedTypeMap].datas;
    this.title.text = this.maps[this.selectedTypeMap].title;
    this.imageSeries.tooltip.background.fill = am4core.color(this.maps[this.selectedTypeMap].colors.max);
    this.circle.tooltipText = this.maps[this.selectedTypeMap].tooltipText;
  }

  private initMainMap(): void {
    const mapId = this.selectedCountry.country === 'France' ? 'map-france' : 'map-world';
    this.chart = am4core.create(mapId, am4maps.MapChart);
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.geodata = this.divisionMap[this.selectedDivisionMap]; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    const polygonTemplate = this.series.mapPolygons.template;
    polygonTemplate.fill = am4core.color('#eeeeee');
    this.series.useGeodata = true;
    this.series.nonScalingStroke = true;
    this.series.strokeWidth = 0.5;
    this.title = this.chart.chartContainer.createChild(am4core.Label);
    this.title.fontSize = 20;
    this.title.fontFamily = 'inherit';
    this.title.paddingTop = 8;
    this.title.paddingLeft = 8;
    this.title.align = 'left';
    this.title.zIndex = 100;
    // remove antarctique
    this.series.exclude = ['AQ'];
    this.imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
    this.imageSeries.dataFields.value = 'value';
    const imageTemplate = this.imageSeries.mapImages.template;

    imageTemplate.nonScaling = true;
    imageTemplate.adapter.add('latitude', (latitude: any, target: any) => {
      const polygon = this.series.getPolygonById(target.dataItem.dataContext.id);
      if (polygon) {
        return polygon.visualLatitude;
      }
      if (!latitude) {
        return 0;
      }
      return latitude;
    });

    imageTemplate.adapter.add('longitude', (longitude: any, target: any) => {
      const polygon = this.series.getPolygonById(target.dataItem.dataContext.id);
      if (polygon) {
        return polygon.visualLongitude;
      }
      if (!longitude) {
        return 0;
      }
      return longitude;
    });
    this.circle = imageTemplate.createChild(am4core.Circle);
    this.circle.fillOpacity = 0.7;
    this.circle.propertyFields.fill = 'color';
    this.imageSeries.tooltip.getFillFromObject = false;
    this.imageSeries.tooltip.background.cornerRadius = 0;
    this.imageSeries.tooltip.background.strokeOpacity = 0;
    this.imageSeries.tooltip.label.textAlign = 'middle';
    this.imageSeries.tooltip.label.fontSize = 14;
    this.imageSeries.heatRules.push({
      target: this.circle,
      property: 'radius',
      min: 4,
      max: 40,
      dataField: 'value'
    });
  }

}

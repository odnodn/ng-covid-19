import { CoronavirusSheetTestComponent } from './containers/coronavirus-sheet-test/coronavirus-sheet-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusGraphComponent } from './components/coronavirus-graph/coronavirus-graph.component';
import { CoronavirusStatsComponent } from './components/coronavirus-stats/coronavirus-stats.component';
import { CoronavirusTableComponent } from './components/coronavirus-table/coronavirus-table.component';
import { CoronavirusLinksComponent } from './containers/coronavirus-links/coronavirus-links.component';
import { CoronavirusMapComponent } from './components/coronavirus-map/coronavirus-map.component';
import { CoronavirusChartAgeComponent } from './components/coronavirus-chart-age/coronavirus-chart-age.component';
import { CoronavirusSelectComponent } from './components/coronavirus-select/coronavirus-select.component';
import { CoronavirusLinksFranceComponent } from './containers/coronavirus-links-france/coronavirus-links-france.component';
import { CoronavirusSheetComponent } from './containers/coronavirus-sheet/coronavirus-sheet.component';
import { CoronavirusChartTestColumnComponent } from './components/coronavirus-chart-test-column/coronavirus-chart-test-column.component';
import { CoronavirusChartPieComponent } from './components/coronavirus-chart-pie/coronavirus-chart-pie.component';
import { CoronavirusChartPyramidComponent } from './components/coronavirus-chart-pyramid/coronavirus-chart-pyramid.component';
import { CoronavirusLinksFranceTestComponent } from './containers/coronavirus-links-france-test/coronavirus-links-france-test.component';
import { CoronavirusSheetEmergencyComponent } from './containers/coronavirus-sheet-emergency/coronavirus-sheet-emergency.component';
import { CoronavirusTransfertComponent } from './containers/coronavirus-transfert/coronavirus-transfert.component';
import { CoronavirusResumeComponent } from './components/coronavirus-resume/coronavirus-resume.component';
import { CoronavirusNewsComponent } from './components/coronavirus-news/coronavirus-news.component';
import { CoronavirusNewsPageComponent } from './containers/coronavirus-news-page/coronavirus-news-page.component';
import { CoronavirusMapDeconfinementComponent } from './containers/coronavirus-map-deconfinement/coronavirus-map-deconfinement.component';
import { CoronavirusMapDeconfinementDetailsComponent } from './components/coronavirus-map-deconfinement-details/coronavirus-map-deconfinement-details.component';
import { CoronavirusMortalityComponent } from './containers/coronavirus-mortality/coronavirus-mortality.component';
import { CoronavirusHeatMapComponent } from './components/coronavirus-heat-map/coronavirus-heat-map.component';
import { CoronavirusMapCentKmComponent } from './containers/coronavirus-map-cent-km/coronavirus-map-cent-km.component';
import { CoronavirusAttestationCentKmComponent } from './containers/coronavirus-attestation-cent-km/coronavirus-attestation-cent-km.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AdsenseModule } from 'ng2-adsense';
import { CoronavirusMapBeachComponent } from './containers/coronavirus-map-beach/coronavirus-map-beach.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { CoronavirusMapTestCentresComponent } from './containers/coronavirus-map-test-centres/coronavirus-map-test-centres.component';
import { CoronavirusEpidemicMeasureComponent } from './components/coronavirus-epidemic-measure/coronavirus-epidemic-measure.component';
import { CoronavirusSheetEpidemicComponent } from './containers/coronavirus-sheet-epidemic/coronavirus-sheet-epidemic.component';
import { CoronavirusGraphMeasureComponent } from './components/coronavirus-graph-measure/coronavirus-graph-measure.component';
import { CoronavirusMapMeasureComponent } from './components/coronavirus-map-measure/coronavirus-map-measure.component';

@NgModule({
  declarations: [
    CoronavirusComponent,
    CoronavirusGraphComponent,
    CoronavirusStatsComponent,
    CoronavirusTableComponent,
    CoronavirusLinksComponent,
    CoronavirusMapComponent,
    CoronavirusChartPieComponent,
    CoronavirusChartAgeComponent,
    CoronavirusSelectComponent,
    CoronavirusLinksFranceComponent,
    CoronavirusSheetTestComponent,
    CoronavirusSheetComponent,
    CoronavirusChartTestColumnComponent,
    CoronavirusChartPyramidComponent,
    CoronavirusLinksFranceTestComponent,
    CoronavirusSheetEmergencyComponent,
    CoronavirusTransfertComponent,
    CoronavirusResumeComponent,
    CoronavirusNewsComponent,
    CoronavirusNewsPageComponent,
    CoronavirusMapDeconfinementComponent,
    CoronavirusMapDeconfinementDetailsComponent,
    CoronavirusMortalityComponent,
    CoronavirusHeatMapComponent,
    CoronavirusMapCentKmComponent,
    CoronavirusAttestationCentKmComponent,
    CoronavirusMapBeachComponent,
    CoronavirusMapTestCentresComponent,
    CoronavirusEpidemicMeasureComponent,
    CoronavirusSheetEpidemicComponent,
    CoronavirusGraphMeasureComponent,
    CoronavirusMapMeasureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoronavirusRoutingModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule.forRoot(),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8075252379413311',
      adSlot: 4190207743,
    }),
    NgxJsonLdModule
  ]
})
export class CoronavirusModule { }

import { CoronavirusSheetTestComponent } from './containers/coronavirus-sheet-test/coronavirus-sheet-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusGraphComponent } from './components/coronavirus-graph/coronavirus-graph.component';
import { CoronavirusStatsComponent } from './components/coronavirus-stats/coronavirus-stats.component';
import { CoronavirusColumnComponent } from './components/coronavirus-column/coronavirus-column.component';
import { CoronavirusTableComponent } from './components/coronavirus-table/coronavirus-table.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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

@NgModule({
  declarations: [
    CoronavirusComponent,
    CoronavirusGraphComponent,
    CoronavirusStatsComponent,
    CoronavirusColumnComponent,
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
    CoronavirusLinksFranceTestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoronavirusRoutingModule,
    NgxChartsModule
  ]
})
export class CoronavirusModule { }

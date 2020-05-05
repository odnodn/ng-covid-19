import { CoronavirusSheetTestComponent } from './containers/coronavirus-sheet-test/coronavirus-sheet-test.component';
import { CoronavirusSheetComponent } from './containers/coronavirus-sheet/coronavirus-sheet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusLinksComponent } from './containers/coronavirus-links/coronavirus-links.component';
import { CoronavirusLinksFranceComponent } from './containers/coronavirus-links-france/coronavirus-links-france.component';
import { CoronavirusLinksFranceTestComponent } from './containers/coronavirus-links-france-test/coronavirus-links-france-test.component';
import { CoronavirusSheetEmergencyComponent } from './containers/coronavirus-sheet-emergency/coronavirus-sheet-emergency.component';
import { CoronavirusTransfertComponent } from './containers/coronavirus-transfert/coronavirus-transfert.component';
import { CoronavirusNewsPageComponent } from './containers/coronavirus-news-page/coronavirus-news-page.component';
import { CoronavirusMapDeconfinementComponent } from './containers/coronavirus-map-deconfinement/coronavirus-map-deconfinement.component';
import { CoronavirusMortalityComponent } from './containers/coronavirus-mortality/coronavirus-mortality.component';
export const coronavirusRoutes: Routes = [
  {
    path: '',
    component: CoronavirusComponent,
    children: [
      {
        path: '',
        component: CoronavirusSheetComponent
      },
      {
        path: 'stats/:country',
        component: CoronavirusSheetComponent
      },
      {
        path: 'stats/:country/region/:region',
        component: CoronavirusSheetComponent
      },
      {
        path: 'stats/:country/departement/:department',
        component: CoronavirusSheetComponent
      },
      {
        path: 'test-depistage/:country',
        component: CoronavirusSheetTestComponent
      },
      {
        path: 'test-depistage/:country/region/:region',
        component: CoronavirusSheetTestComponent
      },
      {
        path: 'test-depistage/:country/departement/:department',
        component: CoronavirusSheetTestComponent
      },
      {
        path: 'urgences/:country',
        component: CoronavirusSheetEmergencyComponent
      },
      {
        path: 'urgences/:country/region/:region',
        component: CoronavirusSheetEmergencyComponent
      },
      {
        path: 'urgences/:country/departement/:department',
        component: CoronavirusSheetEmergencyComponent
      },
      {
        path: 'transfert-patients/:country',
        component: CoronavirusTransfertComponent
      },
      {
        path: 'transfert-patients/:country/region/:region',
        component: CoronavirusTransfertComponent
      },
      {
        path: 'transfert-patients/:country/departement/:department',
        component: CoronavirusTransfertComponent
      },
      {
        path: 'carte-deconfinement/:country',
        component: CoronavirusMapDeconfinementComponent
      },
      {
        path: 'carte-deconfinement/:country/region/:region',
        component: CoronavirusMapDeconfinementComponent
      },
      {
        path: 'carte-deconfinement/:country/departement/:department',
        component: CoronavirusMapDeconfinementComponent
      },
      {
        path: 'carte-exces-mortalite/:country',
        component: CoronavirusMortalityComponent
      }
    ]
  },

  {
    component: CoronavirusLinksComponent,
    path: 'stats/liens/monde',
  },
  {
    component: CoronavirusLinksFranceComponent,
    path: 'stats/liens/france',
  },
  {
    component: CoronavirusLinksFranceTestComponent,
    path: 'stats/liens/test-depistage/france',
  },
  {
    path: 'news',
    component: CoronavirusNewsPageComponent
  },
  {
    path: 'news/:title/:id',
    component: CoronavirusNewsPageComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(coronavirusRoutes)
  ]
})
export class CoronavirusRoutingModule {
}

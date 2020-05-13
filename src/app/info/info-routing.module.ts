import { DiseaseComponent } from './disease/disease.component';
import { GouvComponent } from './gouv/gouv.component';
import { AdviseComponent } from './advise/advise.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseTestComponent } from './disease-test/disease-test.component';

export const infoRoutes: Routes = [
  {
    component: AdviseComponent,
    path: 'conseils',
  },
  {
    component: GouvComponent,
    path: 'gouvernement',
  },
  {
    component: DiseaseTestComponent,
    path: 'maladie-test-coronavirus',
  },
  {
    component: DiseaseComponent,
    path: 'maladie-coronavirus',
  },
  {
    component: DiseaseComponent,
    path: 'maladie-coronavirus',
  },
  {
    component: CookiesComponent,
    path: 'cookies',
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(infoRoutes)
  ]
})
export class InfoRoutingModule {
}

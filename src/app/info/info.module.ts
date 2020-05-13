import { InfoRoutingModule } from './info-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GouvComponent } from './gouv/gouv.component';
import { AdviseComponent } from './advise/advise.component';
import { DiseaseTestComponent } from './disease-test/disease-test.component';
import { DiseaseComponent } from './disease/disease.component';
import { CookiesComponent } from './cookies/cookies.component';

@NgModule({
  declarations: [
    GouvComponent,
    AdviseComponent,
    DiseaseTestComponent,
    DiseaseComponent,
    CookiesComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }

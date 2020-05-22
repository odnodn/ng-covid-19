import { InfoRoutingModule } from './info-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GouvComponent } from './gouv/gouv.component';
import { AdviseComponent } from './advise/advise.component';
import { DiseaseTestComponent } from './disease-test/disease-test.component';
import { DiseaseComponent } from './disease/disease.component';
import { CookiesComponent } from './cookies/cookies.component';
import { AdsenseModule } from 'ng2-adsense';

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
    InfoRoutingModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8075252379413311',
      adSlot: 4190207743,
    }),
  ]
})
export class InfoModule { }

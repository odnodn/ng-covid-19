import localeFr from '@angular/common/locales/fr';
import { LayoutModule } from './layout/layout.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, registerLocaleData, DecimalPipe } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from 'environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    {provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    DeviceDetectorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ]
})
export class AppModule { }

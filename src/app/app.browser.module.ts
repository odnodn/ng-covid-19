import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'cascoronavirus.fr'
  },
  position: 'bottom',
  theme: 'classic',
  palette: {
    popup: {
      background: '#0069cc',
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#ffffff',
      text: '#0069cc',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de Cookies pour vous proposer des publicités ciblées adaptés à vos centres d’intérêts et réaliser des statistiques de visites.',
    dismiss: 'Accepter',
    deny: 'Refuser',
    link: 'En savoir plus',
    href: 'https://www.cascoronavirus.fr/infos/cookies',
    policy: 'Cookie Policy'
  }
};

@NgModule({
  imports: [
    AppModule,
    BrowserModule.withServerTransition({ appId: 'ng-coronavirus' }),
    BrowserTransferStateModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

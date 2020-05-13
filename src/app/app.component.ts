import { Component, HostListener, ApplicationRef, OnInit, OnDestroy, PLATFORM_ID, Inject, Injector } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  deferredPrompt: any;
  showButton = false;
  ccService: any;
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly deviceService: DeviceDetectorService,
    private readonly swUpdate: SwUpdate,
    private readonly injector: Injector,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
    this.isMobile = this.deviceService.isMobile();
    if (swUpdate.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everyThirtyMin$ = interval(0.5 * 60 * 60 * 1000);
      const everyThirtyMinOnceAppIsStable$ = concat(appIsStable$, everyThirtyMin$);

      everyThirtyMinOnceAppIsStable$.subscribe(() => swUpdate.checkForUpdate());
      this.swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
      this.swUpdate.available.subscribe(() => {
        swUpdate.activateUpdate().then(() => document.location.reload());
      });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ccService = this.injector.get(NgcCookieConsentService);
    }

  }

  ngOnDestroy() {
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen(): void {
    if (!this.deferredPrompt) {
      return;
    }
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        this.showButton = false;
        this.deferredPrompt = null;
      });
  }

}

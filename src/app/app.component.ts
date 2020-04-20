import { Component, HostListener } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isMobile: boolean;
  deferredPrompt: any;
  showButton = false;

  constructor(private readonly deviceService: DeviceDetectorService, private swUpdate: SwUpdate) {
    this.isMobile = this.deviceService.isMobile();
    if (swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
      });
      this.swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
      this.swUpdate.available.subscribe(() => {
        console.log('reload');
        if (confirm('Une nouvelle version est disponible. Installer la nouvelle version ?')) {
              window.location.reload();
          }
      });
    }
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

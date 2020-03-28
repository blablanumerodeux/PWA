import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, HostListener, OnDestroy} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private swPush: SwPush) {
    console.log('app constructor');
    this.subscribeToNotifications();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  GRAPHQL_URL = environment.serverUrl + 'graphql' ;

  title = 'homeless';

  mobileQuery: MediaQueryList;

  menu = ['find-shelter', 'create journey', 'list journey'];

  fillerNav = this.menu;

  fillerContent = Array.from({length: 5}, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  VAPID_PUBLIC = 'BIlqlK3aGLFeO-yM_J-Xm9wSsofEhQNzI0DST00EDurfunKD9pRX8W7MlS3Y8OfXzyg1Onwv6yHaC3wVlIGfjdY';

  deferredPrompt: any;
  showButton = true;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  subscribeToNotifications() {
    console.log('app constructor');
    if (this.swPush.isEnabled) {
      console.log('enabled');
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC,
        })
        .then(subscription => {
          // send subscription to the server
        })
        .catch(console.error);
    } else{

      console.log('disable');
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    // e.preventDefault();
    // showInstallPromotion();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}

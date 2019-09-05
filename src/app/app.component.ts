import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  title = 'homeless';

  mobileQuery: MediaQueryList;

  menu = ['find-shelter', 'create journey', 'list journey'];

  fillerNav = this.menu;

  fillerContent = Array.from({length: 50}, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  VAPID_PUBLIC = 'BIlqlK3aGLFeO-yM_J-Xm9wSsofEhQNzI0DST00EDurfunKD9pRX8W7MlS3Y8OfXzyg1Onwv6yHaC3wVlIGfjdY';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private swPush: SwPush) {
    console.log('app constructor');
    this.subscribeToNotifications();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

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

}

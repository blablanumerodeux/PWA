import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  title = 'DaKar-ngFront';
  pageTitle = 'DaKar';

  isMobilePhone: MediaQueryList;

  fillerNav = ['find-journey', 'create journey', 'list journey'];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.isMobilePhone = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.isMobilePhone.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.isMobilePhone.removeListener(this._mobileQueryListener);
  }
}

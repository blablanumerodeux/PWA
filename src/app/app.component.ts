import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title: string = 'DaKar-ngFront';

  constructor() {
    console.log('app constructor');
  }
}

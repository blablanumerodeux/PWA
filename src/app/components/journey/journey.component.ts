import {Component, Input} from '@angular/core';
import {Journey} from '../../models/Journey';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent {

  @Input('journey') journey: Journey;

  constructor() {
  }

}

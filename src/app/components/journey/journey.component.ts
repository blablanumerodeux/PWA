import {Component, OnInit} from '@angular/core';
import {Journey} from "../../models/Journey";

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {

  journey: Journey;

  constructor() {
    console.log('ngOnInit');
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log('journey');
    this.journey = {
      id: 1,
      destination: 'dfdf'
    }
  }

}

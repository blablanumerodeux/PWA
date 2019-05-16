import {Component, OnInit} from '@angular/core';

/**
 * This component should be used to search a Journey
 */
@Component({
  selector: 'app-find-journey',
  templateUrl: './find-journey.component.html',
  styleUrls: ['./find-journey.component.scss']
})
export class FindJourneyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('test');
  }

}

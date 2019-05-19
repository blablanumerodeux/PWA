import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Journey} from '../../models/Journey';
import {JourneyService} from '../../services/journey.service';

/**
 * This component should be used to search a Journey
 */
@Component({
  selector: 'app-find-journey',
  templateUrl: './find-journey.component.html',
  styleUrls: ['./find-journey.component.scss']
})
export class FindJourneyComponent {

  journey: Journey;
  journeysFound: Journey[];
  destination = new FormControl('');
  id = new FormControl('');

  constructor(private journeyService: JourneyService) {
    this.journeysFound = [];
  }

  onSubmit() {
    console.log('id searched: ', this.id.value);
    console.log('destination searched: ', this.destination.value);

    this.journeyService.searchById(this.id.value)
      .subscribe(
        (response) => {
          this.journey = response;
          this.journeysFound = [this.journey];
        },
        (err) => console.error(err),
        () => console.log('done!')
      );
  }
}

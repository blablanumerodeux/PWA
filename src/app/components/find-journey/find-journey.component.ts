import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Journey} from '../../models/Journey';
import {JourneyService} from '../../services/journey.service';
import {log} from 'util';
import {filter, tap} from 'rxjs/operators';

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

    if (this.id.value !== undefined && this.id.value.trim().length !== 0) {
      console.log('id searched: ', this.id.value);
      this.searchById();
    } else if (this.destination.value !== undefined && this.destination.value.trim().length !== 0) {
      console.log('destination searched: ', this.destination.value);
      this.searchByCriterias();
    }
  }

  private searchByCriterias() {
    this.journeyService.searchByCriterias(this.destination.value)
      .pipe(
        tap(result => log(result)),
        filter(res => Array.from(res).length > 0),
        tap(result => log(result))
      )
      .subscribe(
        (response) => {
          this.journeysFound = response;
        },
        (err) => console.error(err),
        () => console.log('done searching by criteria !')
      );
  }

  private searchById() {
    this.journeyService.searchById(this.id.value)
      .pipe(tap(result => log(result)))
      .subscribe(
        (response) => {
          this.journey = response;
          this.journeysFound = [this.journey];
        },
        (err) => console.error(err),
        () => console.log('done searching by id !')
      );
  }
}

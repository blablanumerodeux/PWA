import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import gql from 'graphql-tag';
import {map, shareReplay} from 'rxjs/operators';
import {Journey} from '../../models/Journey';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';

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

  destination$: Observable<any[]>;
  loading$: Observable<boolean>;
  errors$: Observable<any>;

  constructor(private apollo: Apollo) {
    this.journey = new Journey();
    this.journeysFound = [];
  }

  onSubmit() {
    console.log('id searched: ', this.id.value);
    console.log('destination searched: ', this.destination.value);

    this.searchById();
  }

  searchById() {
    const source$ = this.apollo.query({
      query: gql`
        query find{
          findJourneyById(id: "tt") {
            id,
            destination
          }
        }
      `
    }).pipe(shareReplay(1));

    this.destination$ = source$.pipe(map(result => result.data && result.data['findJourneyById']));
    this.destination$.subscribe(
      (response) => {
        console.log(response);
        this.journey.id = response['id'].toString();
        this.journey.destination = response['destination'].toString();
        this.journeysFound = [this.journey];
      },
      (err) => console.error(err),
      () => console.log('done!')
    );
    console.log(this.destination$);
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }

  searchByDestination() {
    const source$ = this.apollo.query({
      query: gql`
        query find{
          findJourneyByDestination(destination: "tt") {
            id,
            destination
          }
        }
      `
    }).pipe(shareReplay(1));

    this.destination$ = source$.pipe(map(result => result.data && result.data['findJourneyByDestination']));
    this.destination$.subscribe(
      (response) => {
        console.log(response);
        this.journeysFound = response;
      },
      (err) => console.error(err),
      () => console.log('done!')
    );
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }
}

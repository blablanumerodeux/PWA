import {Component, OnInit} from '@angular/core';
import {Journey} from '../../models/Journey';
import gql from 'graphql-tag';
import {map, shareReplay} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {

  journey: Journey;
  rates$: Observable<any[]>;
  loading$: Observable<boolean>;
  errors$: Observable<any>;

  constructor(private apollo: Apollo) {
    console.log('journey constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.journey = {
      id: 1,
      destination: 'dfdf'
    };

    const source$ = this.apollo.query({
      query: gql`
        query find{
          findJourneyById(id: "tt") {
            destination
          }
        }
      `
    }).pipe(shareReplay(1));

    this.rates$ = source$.pipe(map(result => result.data && result.data['findJourneyById']['destination']));
    this.rates$.subscribe(
      (res) => {
        this.journey.destination = res.toString();
        console.log(res);
      },
      (err) => console.log(err),
      () => console.log('done!')
    );
    console.log(this.rates$);
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }
}

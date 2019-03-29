import {Component, OnInit} from '@angular/core';
import {Journey} from "../../models/Journey";
import gql from "graphql-tag";
import {map, shareReplay} from "rxjs/operators";
import {Apollo} from "apollo-angular";
import {Observable} from "rxjs";

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
    console.log('ngOnInit');
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log('journey');
    this.journey = {
      id: 1,
      destination: 'dfdf'
    };
    const source$ = this.apollo.query({
      query: gql`
        {
          rates(currency: "USD") {
            currency
            rate
          }
        }
      `
    }).pipe(shareReplay(1));

    this.rates$ = source$.pipe(map(result => result.data && result.data['rates']));
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }

}

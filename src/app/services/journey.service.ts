import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {Journey} from '../models/Journey';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private apollo: Apollo) {
  }

  /**
   * search by id
   * @param value
   */
  searchById(value: number): Observable<Journey> {

    const source$ = this.apollo.query({
      query: gql`
        query find{
          findJourneyById(id: "${value}") {
            id,
            destination
          }
        }
      `
    }).pipe(shareReplay(1));

    const destination$: Observable<any[]> = source$.pipe(map(result => result.data && result.data['findJourneyById']));
    const loading$: Observable<boolean> = source$.pipe(map(result => result.loading));
    const errors$: Observable<any> = source$.pipe(map(result => result.errors));
    return destination$;
  }

  /**
   *
   */
  searchByDestination() {
    const source$ = this.apollo.query({
      query: gql`
        query find{
          searchJourney(destination: "tt") {
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
        const journeysFound = response;
      },
      (err) => console.error(err),
      () => console.log('done!')
    );
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }
}

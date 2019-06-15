import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {filter, map, shareReplay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {Journey} from '../models/Journey';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private apollo: Apollo) {
  }

  /**
   * search by id
   * @param id searched
   */
  searchById(id: number): Observable<Journey> {
    const source$ = this.apollo.query({
      query: gql`
        query find{
          findJourneyById(id: "${id}") {
            id,
            destination
          }
        }
      `
    }).pipe(shareReplay(1));

    const destination$: Observable<Journey> = source$.pipe(
      tap(result => log(result)),
      map(result => result.data && result.data['findJourneyById']),
      filter(result => result !== null)
    );
    const loading$: Observable<boolean> = source$.pipe(map(result => result.loading));
    const errors$: Observable<any> = source$.pipe(map(result => result.errors));
    return destination$;
  }

  /**
   * search by destination
   * @param destination searched
   */
  searchByCriterias(destination: string): Observable<Array<Journey>> {
    const source$ = this.apollo.query({
      query: gql`
        query search{
          searchJourney(criteria: {destination: {contains: "${destination}"}}) {
            id
            destination
          }
        }
      `
    }).pipe(shareReplay(1));

    const destination$: Observable<Array<Journey>> = source$.pipe(
      tap(result => log(result)),
      map(result => result.data && result.data['searchJourney']),
      filter(result => result !== null)
    );
    const loading$: Observable<boolean> = source$.pipe(map(result => result.loading));
    const errors$: Observable<any> = source$.pipe(map(result => result.errors));
    return destination$;
  }
}

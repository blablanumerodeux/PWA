import {Component, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit {

  shelter: Shelter;

  constructor(private http: HttpClient) {
    console.log('journey constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.shelter = {
      id: 1,
      address: 'dfdf',
      availableBeds: 9
    };
    this.http.get('http://localhost:4200/api/shelters?page=0&size=2').subscribe(data => {
      console.dir(data);
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  private _bookListUrl = 'https://www.googleapis.com/books/v1/volumes?q=extreme%20programming';
​
  constructor(private _httpClient: HttpClient) {
  }
​
  ngOnInit() {
    this._httpClient.get(this._bookListUrl);
    console.log("YEAHHHH")
  }
​
}

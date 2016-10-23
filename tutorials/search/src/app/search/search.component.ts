import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  items = []

  constructor(private http: Http) { }

  ngOnInit() {}

  onSubmit(form) {
    let backend = 'http://localhost:8080/Plone'; // Plone 5
    // let backend = 'http://localhost:8080/Plone'; // plone.server

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let query = '?SearchableText=' + form.search;

    return this.http.get(
      backend + '/@search' + query,
      { headers }
    )
    .subscribe(res => {
      let data = res.json();
      this.items = data.items;
    })
  }
}

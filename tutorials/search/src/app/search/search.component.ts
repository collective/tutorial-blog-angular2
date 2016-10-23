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
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let query = '?SearchableText=' + form.search;

    return this.http.get(
      'http://localhost:8080/Plone/@search' + query,
      { headers }
    )
    .subscribe(res => {
      let data = res.json();
      this.items = data.items;
    })
  }
}

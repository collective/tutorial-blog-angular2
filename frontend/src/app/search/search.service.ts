import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  search(query): Observable<any> {
    let backend = 'http://localhost:8080/Plone'; // Plone 5
    // let backend = 'http://localhost:8080/Plone'; // plone.server
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    let url = backend + '/@search?portal_type=News+Item&SearchableText=' + query;
    return this.http.get(url, { headers })
    .map(res => res.json().items)
    .map(res => {
      return res
      .map(item => {
        let parts = item['@id'].split('/');
        item.postId = parts[parts.length - 1];
        return item;
      });
    });
  }
}

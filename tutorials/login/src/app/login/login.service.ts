import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(login: string, password: string): Observable<any> {
    // let backend = 'http://localhost:8080/Plone'; // Plone 5
    let backend = 'http://localhost:8080/Plone'; // plone.server
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      backend + '/@login',
      JSON.stringify({
        'login': login,
        'password': password
      }),
      { headers }
    )
    .map(res => res.json())
    .map((res) => {
 
      if (res.token) {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
      }

      return true;
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

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
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      'http://localhost:8080/Plone/@login',
      JSON.stringify({
        'login': login,
        'password': password
      }),
      { headers }
    )
    .map(res => res.json())
    .map((res) => {
 
      if (res.token) {
        localStorage.setItem('auth_token', res.token);
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

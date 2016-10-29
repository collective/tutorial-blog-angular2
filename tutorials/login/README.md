# Login tutorial

> Note: this tutorial goes through the different steps needed to create a basic application displaying a login form able to authentify to the Plone REST API. If you run all those steps prperly, you should obtain a code similar to the one contained in the current folder.

## Initializing the application

Create application:
```
$ ng new login
```

Add the home component:
```
$ cd login
$ ng g component home
```

As we want to be able to display either the home page, either the login page, we need routing.

Let's add two routes:

app.module.ts:

```javascript
import { RouterModule } from '@angular/router';

@NgModule({
  ...
  imports: [
    ...
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ])
  ...
})
```

app.component.html:
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/login">Login</a>
</nav>
<router-outlet></router-outlet>
```

## Initializing the Login component

Add the login component:
```
$ ng g component login
```

A `./login` folder has been created containing the component `.ts` file, its `.css` style file, its `.html` template, and its `.spec.ts` test file.

## Implementing the Lofin service
We prefer to implement the logic logic outside the component itself (which is supposed to focus only on the UI aspects).

We need an extra file here to implement the login service.

Go in the `./login` folder and create a `login.service.ts` file:

```javascript
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
```

It provides a `login()` method which returns an observable (all HTTP calls are handled as observables in Angular 2, so we can subscibe to them, and take an action when we get a response).

We can use the `map()` method on observables in order to chain different transformation or processing, and each `map()` call will also return an observable.

In our current case, we parse the JSON returned by the backend, then we check if it contains a token, and if that is the case, it stores it in the localstorage.

It also provides a `logout()` method to remove the stored token.

## Using the service in the component

Now we can use our service in our Login component:

login/login.component.ts:
```javascript
...
import { UserService } from './login.service';

@Component({
  ...
  providers: [UserService],
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  authentication_error = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  onSubmit(form) {
    this.userService.login(form.username, form.password).subscribe(
      data => {
        if (data===true) {
          this.router.navigate(['']);
        }
      },
      err => {
        this.authentication_error = true;
        console.log("Can't get page. Error code: %s, URL: %s ",
                err.status, err.url);
       }
    );
  }
}
```

We make the service accessible from our component by declaring it in the `providers` list, and by adding it as a parameter in the constructor.

> We do not need to add the routing service in `providers` because it is already provided at a global level (in `app.module.ts`), but we do it to mention it the constructor so we can access it from the component implementation.

In the `onSubmit` method, we call the service's `login` method, and we subscribe to the returned observable. Depending on the answer, we will either redirect to the home page or display an error message.

The Login component template will just display a form that way:

login/login.component.html:
```html
<div [hidden]="!loggedIn">
  You are logged in. <button (click)="logout()">Logout</button>
</div>
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
  <div [hidden]="!authentication_error">
    Authentication failed!
  </div>
  <div>
    <label for="username">Username</label>
    <input type="text" name="username"  id="username" required ngModel />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password"
    required ngModel />
  </div>
  <button>
    Log in
  </button>
</form>
```

As in the Search tutorial, the form element binds its submit event to the `onSubmit` method we created in the component using the `(ngSubmit)` directive, and the input elements are bound to the form using the `ngModel` directive.

We also make sure to display (or not) the error message and the Logout button depending on the current state of the component using the `[hidden]` directive.

We bind the `logout()` method to the button click using the `(click)` directive.

We can now launch the app:

```
$ ng serve
```
Then go to http://localhost:4200 in your browser.
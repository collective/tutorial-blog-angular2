# Login tutorial

> Note: this tutorial goes through the different steps needed to create a basic application displaying a login form able to authentify to the Plone REST API. If you run all those steps prperly, you should obtain a code similar to the one contained in the current folder.

## Initialize the application

Create application:
```
  $ ng new login
```

Add the home component:
```
  $ cd login
  $ ng g component home
```

app.module.ts:

```javascript
  import { RouterModule } from '@angular/router';

  @NgModule({
    ...
    imports: [
      BrowserModule,
      FormsModule,
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

## Create the Login component

Add the login component:
```
  $ ng g component login
```

Every component created by the ng CLI has its own folder.
A `./login` has been created containing the component `.ts` file, its `.css` style file, its `.html` template, and its `.spec.ts` test file.

We need and extra file here to implement the login service.

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

It provides a `login()` method which returns an observable (all HTTP calls are handled as observables in Angular 2).

We can use the `map()` method on observables in order to chain different transformation or processing, and each `map()` call will also return an observable.

In our current case, we parse the JSON returned by the backend, then we check if it contains a token, and if that is the case, it stores it in the localstorage.

Now we can use our service in our Login component:

login/login.component.ts:
```javascript
  ...

  import { UserService } from './login.service';

  @Component({
    ...
    providers: [UserService],
  })
  export class LoginComponent {
    username = '';
    password = '';
    authentication_error = false;

    constructor(private userService: UserService, private router: Router) {}

    onSubmit() {
      this.userService.login(this.username, this.password).subscribe(
        data => {
          if (data===true) {
            this.router.navigate(['']);
          }
        },
        err => {
          this.authentication_error = true;
          console.log("Can't get page. Error code: %s, URL: %s ",
                  err.status, err.url);
         },
        () => console.log("Done")
      );
    }
  }
```

We make the service accessible from our component by declaring it in the `providers` list, and by adding it as a parameter in the constructor.

In the `onSubmit` method, we call the services's `login` method, and we subscribe to the returned observable. Depending n the answer, we will either redirect to the home page or display an error message.

The Login component template will just display a form that way:

login/login.component.html:
```html
  <form #f="ngForm" (ngSubmit)="onSubmit()">
    <div [hidden]="!authentication_error">
      Authentication failed!
    </div>
    <div>
      <label for="username">Username</label>
      <input type="text" name="username"  id="username" required  [(ngModel)]="username"/>
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" id="password"
      required
      [(ngModel)]="password" />
    </div>
    <button>
      Log in
    </button>
  </form>
```

Using the `(ngSubmit)` directive, the form element binds its submit event to the `onSubmit` method we created in the component.

The input elements are bound to the component properties using the `[(ngModel)]`.
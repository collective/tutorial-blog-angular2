
Create application::

  $ ng new login

Add home/login components::

  $ ng g component home
  $ ng g component login

app.module.ts::

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

app.component.html::

  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/login">Login</a>
  </nav>
  <router-outlet></router-outlet>

# Blogpost tutorial

> Note: this tutorial goes through the different steps needed to create a basic application with the following features: displaying a list of blog posts, displaying a detailed blog post, and creating a new post. If you run all those steps properly, you should obtain a code similar to the one contained in the current folder.

## Initializing the application

Create application:
```
  $ ng new blogpost
```

Add the home component:
```
  $ cd blogpost
  $ ng g component home
```

As we want to be able to display either the home page, either the post creation page, either the post detail page, we will need 3 routes.

Instead of declaring our routes directly in the app module, we will create a specific file:

app.routes.ts:

```javascript
  import { ModuleWithProviders } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';

  import { HomeComponent } from './home/home.component';
  import { BlogpostComponent } from './blogpost/blogpost.component';
  import { BlogpostCreateComponent } from './blogpost/blogpost.create.component';

  export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: BlogpostCreateComponent },
    { path: ':path', component: BlogpostComponent }
  ];

  export const appRoutingProviders: any[] = [];

  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
```

As you can see, the last route, use a parameter which will allow use to specifiy the post id in the path.

And we load our routes in the module like this:
app.module.ts:

```javascript
  import { RouterModule } from '@angular/router';
  import {
    routing,
    appRoutingProviders
  } from './app.routes.ts';

  @NgModule({
    ...
    imports: [
      ...
      RouterModule,
      routing
    ],
    providers: [
      ...,
      appRoutingProviders
    ]
  })
```

app.component.html:
```html
  <nav>
    <a routerLink="/">Home</a>
  </nav>
  <router-outlet></router-outlet>
```

# Displaying the list of posts

The list of posts will be displayed by the Home component.
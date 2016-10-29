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

As we want to be able to display either the home page, either the post creation page, either the post detail page, we will need 3 routes. But for now we will only use one route for home.

Instead of declaring our routes directly in the app module, we will create a specific file:

app.routes.ts:

```javascript
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
```

As you can see, the last route uses a parameter which will allow us to specifiy the post id in the path.

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

First, we need a service to fetech all the posts from the Plone backend:

home/home.service.ts:
```javascript
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  constructor(private http: Http) {}

  getBlogPosts(): Observable<any> {
    let backend = 'http://localhost:8080/Plone'; // Plone 5
    // let backend = 'http://localhost:8080/Plone'; // plone.server
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    return this.http.get(backend + '/news', { headers })
    .map(res => res.json().items)
    .map(res => {
      return res
      .filter(item => item['@type'] === 'News Item')
      .map(item => {
        let parts = item['@id'].split('/');
        item.postId = parts[parts.length - 1];
        return item;
      });
    });
  }
}
```

This service has a unique method which makes a GET on the backend's `/news` folder.
The results are:

- firstly, filtered in order to get only News Items
  
  > It would have been more accurate to ask the backend to perform this filtering using the `@search` endpoint but that is not in the scope of this tutorial.

- secondly, processed in order to set an id on our retrieved posts (we use the last part of the `@id` attributes which contains the URL of the post).

In the Home component, we instantiate the service using `providers`, and we inject it in the constructor. Now we can subscribe to it and get the blogposts list:

home/home.component.ts:
```javascript
import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  blogPosts: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getBlogPosts().subscribe( res => {
      this.blogPosts = res;
    });
  }
}

```
To display the posts, we do a loop using `*ngFor`:

home/home.component.html:
```
<button [routerLink]="['/create']">
Create Blog Post
</button>
<div *ngFor="let blogPost of blogPosts">
  <h2>{{blogPost.title}}</h2>
  <div>
    {{blogPost.description}}
  </div>
  <a [routerLink]="blogPost.postId">
    Continue reading...
  </a>
</div>
```
As you can see, the links to the detailed posts and the link to the Create button are managed by the router (using the `routerLink` directive). We will declare the needed routes later.

## Displaying a detailed post

Add the blogpost component:
```
$ ng g component blogpost
```

Add a route to call the Blogpost component:

app.routes.ts:

```javascript
...
import { BlogpostComponent } from './blogpost/blogpost.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':path', component: BlogpostComponent }
];
...
```
As you can see, our new route uses a parameter which will allow us to specifiy the post id in the path. For instance http://localhost:4200/plone-rocks will display the post which id is `plone-rocks`

We also need a service to call the backend, we create a new file named blogpost/blogpost.service.ts:
```javascript
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogPostService {

  backend = 'http://localhost:8080/Plone'; // Plone 5
  // backend = 'http://localhost:8080/Plone'; // plone.server

  constructor(private http: Http) {}

  getBlogPost(id): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    return this.http.get(this.backend + '/news/' + id, { headers })
    .map(res => res.json());
  }
}

```

Now we can implement the component:

blogpost/blogpost.component.ts:
```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from './blogpost.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})
export class BlogpostComponent implements OnInit {

  blogpostId: string;
  title: string;
  description: string;
  text: string;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let path = params['path'];
      this.blogPostService.getBlogPost(path).subscribe(item => {
        this.title = item.title;
        this.description = item.description;
        this.text = item.text.data;
      });
    });
  }
}

```

By injecting `ActivatedRoute` in our constructor (note: we do not need to add it to the `providers` list, it is provided at the app global level), we can subscribe to the route `params`, so we can get the post id requested in the current path.

The template is very simple:

blogpost/blogpost.component.html:
```html
<h2>{{title}}</h2>
<div>{{description}}</div>
<p [innerHTML]="text"></p>
```
> Note: we use the `innerHTML` directive so the `text` value is rendered as HTML.

## Creating a new post

We will not generate a component folder for the post creation, we will just implement it in the existing `./blogpost` folder.

We add a new method in blogpost/blogpost.service.ts:
```javascript
...
@Injectable()
export class BlogPostService {
  ...

  postBlogPosts(title, description, text): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    return this.http.post(
      this.backend + '/news',
      JSON.stringify({
        '@type': 'News Item',
        'title': title,
        'text': text,
        'description': description,
      }),
      { headers })
    .map(res => res.json())
    .map((res) => {
      return true;
    });
  }
}
```
It makes a POST request in the Plone `/news` folder to create a new "News Item" content. It returns `true` if the creation is successful.

We create blogpost/blogpost.create.component.ts:
```javascript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from './blogpost.service';

@Component({
  selector: 'app-home',
  templateUrl: './blogpost.create.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})
export class BlogpostCreateComponent {

  constructor(private blogPostService: BlogPostService, private router: Router) {}

  onSubmit(form) {
    this.blogPostService.postBlogPosts(form.title, form.description, form.text).subscribe(
      data => {
        if (data === true) {
          this.router.navigate(['']);
        }
      },
      () => console.log('Done')
    );
  }

}

```
The `onSubmit` will call the service to create the post, and then redirect to home.

Now we need to declare this new component in the app module:

app.module.ts:
```javascript
...
import { BlogpostCreateComponent } from './blogpost/blogpost.create.component';

@NgModule({
  declarations: [
    ...
    BlogpostCreateComponent
  ],
  ...
```

And we need to declare its route:

app.routes.ts:

```javascript
...
import { BlogpostCreateComponent } from './blogpost/blogpost.create.component';

export const routes: Routes = [
  ...
  { path: 'create', component: BlogpostCreateComponent }
];
...
```

We can now launch the app:

```
$ ng serve
```
Then go to http://localhost:4200 in your browser.
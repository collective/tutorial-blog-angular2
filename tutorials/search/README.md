# Search tutorial

> Note: this tutorial goes through the different steps needed to create a basic search application based on the Plone REST API. If you run all those steps prperly, you should obtain a code similar to the one contained in the current folder.

## Initialize the application

Cd to your project directory and use ng to create a new search application:
```
$ ng new search
```

This will bootstrap a basic package together in a directory named after the
application. In our case, search.  Finally we will add a search component.

Cd into the newly created search directory and use ng to create the component:
```
$ cd search
$ ng g component search
```

The new search component should live in the the app container. Cd into the component:
```
$ cd ./src/app/search
```

The following files should have been generated for you:
```
search.component.css
search.component.html
search.component.spec.ts
search.component.ts
```

You'll see that the component in search.component.ts defines its css selector, css and html template files:

```javascript
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
    })
```

The `selector` indicates the tagname we can use to include this component somewhere (and we will include it in the app main template later).

## Adding the Search Template

Open the `search.component.html` file in a text editor and remove the default html generated during bootstrap.

Add the following html to the file:

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
  <div>
    <label for="search">Search Site</label>
    <input type="text" name="search" id="search" ngModel />
  </div>
  <button>Search</button>
  <ol>
    <li *ngFor="let item of items">{{ item.title }}</li>
  </ol>
</form>
```

Here is what it does:

  - the `#f="ngForm"` directive indicates we create a local variable (named `f`) to handle the current NgForm object,
  - the `ngSubmit` directive allows to bind the submit event to any method (here the `onSubmit` method that will be implemented later in our component),
  - the `ngModel` directive on the `input` tag add the input value to the form model (basically, it means `f.value` will contain a property named `search` containing the current value of our input),
  - and finally, the `ngFor` directive allows to loop over the `items` values to display the results, `items` is a property of our component (and we will set its value according the backend response).

## Implementing the component

Open the `search.component.ts` file in a text editor and modfiy it that way:

```javascript
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
```

> Make sure to comment/uncomment the proper backend definition.

Explanations:

  - we declare our `items` property as an empty array,
  - we inject the `Http` service in the constructor so we can use it locally,
  - we implement the `onSubmit` method that will be called when the user will submit the form:
    - it creates an HTTP GET request to the Plone API `@search` entry point using the `SearchableText` index,
    - we subscribe to this HTTP request, so we can process its returned value once returned,
    - we parse it as JSON,
    - and put its `items` property in our component's `items` property.

## Displaying the component in the app

Finally we need to insert our Search component in the main app template.

Open the `search.component.html` file in a text editor and replace the default html generated during bootstrap with:

```html
<app-search></app-search>
```

We can now launch the app:

```
$ ng serve
```
Then go to http://localhost:4200 in your browser.
Prerequisites
------------

This tutorial uses the Angular javascript framework. Angular is well documented at:

https://angular.io/docs/ts/latest/

Install nvm on your system using the instructions and provided script at:

https://github.com/creationix/nvm#install-script

Using nvm we will look up the latest lts version of node.js and install it:

  $ nvm ls-remote --lts
  $ nvm install v6.9.1
  $ nvm use v6.9.1

Next we will install the angular-cli (ng):

  $ npm install -g angular-cli

Barring any errors, ng will be available from the command line and we are ready
to bootstrap an application.

Bootstrap App
-------------
Cd to your project directory and use ng to create a new search application:

  $ ng new search

This will bootstrap a basic package together in a directory named after the
application. In our case, search.  Finally we will add a search component.

Cd into the newly created search directory and use ng to create the component:

  $ cd search
  $ ng g component search

The new search component should live in the the app container. Cd into the component:

  $ cd ./src/app/search

The following files should have been generated for you::

  search.component.css
  search.component.html
  search.component.spec.ts
  search.component.ts

You'll see that the component in search.component.ts defines its css selector, css and
html template files:

  ```typescript
  @Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
      })
  ```

Adding the Search Template
--------------------------
Open the search.component.html file in a text editor and remove the default html generated
during bootstrap.

Add the following html to the file:

  ```html
  <div class="plone-search">
    <form #f="ngForm" (ngSubmit)="onSubmit()">
      <div>
        <div class="mdl-textfield mdl-js-textfield">
          <label class="mdl-textfield__label" for="search">Search Site</label>
          <input class="mdl-textfield__input" type="text" name="search" id="search" ngModel/>
        </div>
      </div>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised">
          Search
        </button>
      </div>
    </form>
  </div>
  ```

- To do
- Fix formatting
- Update component code
- Work out live results
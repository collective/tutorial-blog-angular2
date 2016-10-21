Blog Angular 2 client
======================

Installation
------------

Install the Angular CLI globally::

    $ npm install -g angular-cli@latest

Initialize the setup::

    $ ng init

Run the client
--------------

::

    $ ng serve

You can access it by navigating to http://localhost:4200/


Material Design Lite
--------------------

Add mdl as a dependency::

  $ npm install material-design-lite --save

angular-cli.json::

  "styles": [
    "styles.css",
    "../node_modules/material-design-lite/material.css"
  ],
  "scripts": [
    "../node_modules/material-design-lite/material.js"
  ],

index.html::

  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

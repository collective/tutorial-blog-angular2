Tutorial Blog Angular 2
=======================

Backend
-------

The backend is just a plain Plone 5 site with plone.restapi installed.

Installation::

  $ cd backend
  $ bin/buildout

Start backend::

  $ bin/instance fg

Create a Plone site by navigating to http://localhost:8080, and then install `plone.restapi` in Site Setip / Add-ons.


Frontend
--------

Install node 6.9.1 (https://nodejs.org/en/).

Installation::

  $ cd frontend
  $ npm install
  $ npm start

Then go to http://localhost:4200 in your browser.

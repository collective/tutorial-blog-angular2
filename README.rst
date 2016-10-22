Tutorial Blog Angular 2
=======================

Backend
-------

The backend is just a plain Plone 5 site with plone.restapi installed.

Installation::

  $ virtualenv restapi
  $ source restapi/bin/activate
  $ cd backend
  $ python bootstrap-buildout.py
  $ bin/buildout

Start backend::

  $ bin/instance fg

Frontend
--------

Install node 6.9.1 (https://nodejs.org/en/).

Installation::

  $ cd frontend
  $ npm install
  $ npm start

Then go to http://localhost:4200 in your browser.

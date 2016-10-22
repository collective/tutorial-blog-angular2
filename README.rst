Tutorial Blog Angular 2
=======================

.. image:: https://secure.travis-ci.org/collective/tutorial-blog-angular2.png?branch=master
    :target: http://travis-ci.org/collective/tutorial-blog-angular2
    :alt: Tests


Setup the Backend
-----------------

The backend is just a plain Plone 5 site with plone.restapi installed.

Installation::

  $ cd backend
  $ bin/buildout

The buildout will automatically create a site (id=Plone, login=admin/admin).

Start backend::

  $ bin/instance fg


Build the Frontend
------------------

Install node 6.9.1 (https://nodejs.org/en/).

TODO: we should move here the install details from the Search tutorial.

Installation::

  $ cd frontend
  $ npm install
  $ npm start

Then go to http://localhost:4200 in your browser.

Tutorials
---------

Each tutorial explains how to create an application which focuses on one very specific feature (Search, Login, Blogpost).

**First tutorial: Search**

**First tutorial: Login**

**First tutorial: Blogpost**

Tutorial Plone Blog Angular 2
=============================

.. image:: https://secure.travis-ci.org/collective/tutorial-blog-angular2.png?branch=master
    :target: http://travis-ci.org/collective/tutorial-blog-angular2
    :alt: Tests

This tutorial aims to learn how to use Angular 2 with a Plone backend.
It is not a full Angular 2 tutorial, but it allows to discover the main principles of this framework in a very progressive way, so if you are not familiar with Angular 2, you should be just fine.

If you are already familiar with Angular 2, it is still very useful as it provides interesting examples of Plone REST API usecases.

Prerequisites
------------

This tutorial uses the Angular javascript framework. Angular is well documented at:

https://angular.io/docs/ts/latest/

Install nvm on your system using the instructions and provided script at:

https://github.com/creationix/nvm#install-script

Using nvm we will look up the latest lts version of node.js and install it::

    $ nvm ls-remote --lts
    $ nvm install v6.9.1
    $ nvm use v6.9.1

Next we will install the angular-cli (ng)::

    $ npm install -g angular-cli

Barring any errors, ng will be available from the command line and we are ready
to bootstrap an application.

Setup the Backend
-----------------

The backend can be either a plain Plone 5 site with plone.restapi installed, or a plone.server instance with pserver.cms.

Backend setup is::

  $ virtualenv restapi
  $ source restapi/bin/activate
  $ cd backend
  $ python bootstrap-buildout.py
  $ bin/buildout

- To setup a Plone 5 instance, you can use the following Docker image:

    TODO: create a Docker image

- or you can build it locally::

        $ cd backend
        $ bin/buildout

    The buildout will automatically create a site (id=Plone, login=admin/admin).

    Start backend::

        $ bin/instance fg

- To setup plone.server, use the following Docker image:

    https://hub.docker.com/r/plone/pserver.demo/

    ::

        $ docker pull plone/pserver.demo
        $ docker run -it -p 8080:8080 plone/pserver.demo


Build the Frontend
------------------

Installation::

    $ nvm use v6.9.1
    $ cd frontend
    $ npm install
    $ npm start

Then go to http://localhost:4200 in your browser.

Tutorials
---------

Each tutorial explains how to create separate working applications which each focused on one very specific feature (Search, Login, Blogpost). It allows to understand more easily how the Angular 2 app located in the `/frontend` folder is structured.

**First tutorial: Search**

**First tutorial: Login**

**First tutorial: Blogpost**

/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeService } from './home.service';
import { HomeComponent } from './home.component';

describe('Component: Home', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        HomeService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
      imports: [RouterTestingModule]
    });
    this.fixture = TestBed.createComponent(HomeComponent);
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = {
      '@id': 'http://localhost:8080/Plone/news',
      '@type': 'Folder',
      'UID': '7b6714bca6794be9a9d36ba18d5665bf',
      'allow_discussion': null,
      'contributors': [],
      'created': '2016-10-22T17:16:21-04:00',
      'creators': [
        'admin'
      ],
      'description': 'Site News',
      'effective': null,
      'exclude_from_nav': false,
      'expires': null,
      'id': 'news',
      'items': [
        {
          '@id': 'http://localhost:8080/Plone/news/aggregator',
          '@type': 'Collection',
          'description': 'Site News',
          'title': 'News'
        },
        {
          '@id': 'http://localhost:8080/Plone/news/plone-conf-2016',
          '@type': 'Document',
          'description': 'It was so awesome!!!',
          'title': 'Plone conf 2016'
        },
        {
          '@id': 'http://localhost:8080/Plone/news/plone-conf-2016-1',
          '@type': 'News Item',
          'description': 'It was so awesome!!!',
          'title': 'Plone conf 2016'
        },
        {
          '@id': 'http://localhost:8080/Plone/news/kkjl',
          '@type': 'News Item',
          'description': 'lkjljlkj',
          'title': 'kkjl'
        }
      ],
      'items_total': 4,
      'language': 'en',
      'modified': '2016-10-23T16:43:45-04:00',
      'nextPreviousEnabled': false,
      'parent': {
        '@id': 'http://localhost:8080/Plone',
        '@type': 'Plone Site',
        'description': '',
        'title': ''
      },
      'relatedItems': [],
      'review_state': 'published',
      'rights': '',
      'subjects': [],
      'title': 'News'
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should display 2 news items', () => {
    let home = this.fixture.componentInstance;
    home.ngOnInit();
    expect(home.blogPosts.length).toEqual(2);
  });
});

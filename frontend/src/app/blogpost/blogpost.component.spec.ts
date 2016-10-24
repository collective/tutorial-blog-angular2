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

import { BlogPostService } from './blogpost.service';
import { BlogpostComponent } from './blogpost.component';

describe('Component: Blogpost', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlogpostComponent
      ],
      providers: [
        BlogPostService,
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
    this.fixture = TestBed.createComponent(BlogpostComponent);
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = {
      '@id': 'http://localhost:8080/Plone/news/plone-conf-2016-1',
      '@type': 'News Item',
      'UID': '6f7225673acd4f4995fe35eb4ec00a88',
      'allow_discussion': null,
      'changeNote': '',
      'contributors': [],
      'created': '2016-10-23T16:18:07-04:00',
      'creators': [
        'admin'
      ],
      'description': 'It was so awesome!!!',
      'effective': null,
      'exclude_from_nav': false,
      'expires': null,
      'id': 'plone-conf-2016-1',
      'image': null,
      'image_caption': null,
      'language': '',
      'modified': '2016-10-23T16:18:08-04:00',
      'parent': {
        '@id': 'http://localhost:8080/Plone/news',
        '@type': 'Folder',
        'description': 'Site News',
        'title': 'News'
      },
      'relatedItems': [],
      'review_state': 'private',
      'rights': '',
      'subjects': [],
      'text': {
        'content-type': 'text/html',
        'data': 'I mean, really. See you all next year!',
        'encoding': 'utf8'
      },
      'title': 'Plone conf 2016'
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should display a news item', () => {
    let blogpost = this.fixture.componentInstance;
    blogpost.ngOnInit();
    expect(blogpost.title).toEqual('Plone conf 2016');
  });


});

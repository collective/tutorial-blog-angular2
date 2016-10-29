/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';
import {
    RouterTestingModule
} from '@angular/router/testing';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

describe('Component: Search', () => {
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      providers: [
        SearchService,
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
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule ]
    });
    this.fixture = TestBed.createComponent(SearchComponent);
    inputElement = this.fixture.nativeElement.querySelector('input');
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = {
      'items': [
          {'@id': 'something/news1', 'title': 'News 1'},
          {'@id': 'something/news2', 'title': 'News 2'}
      ]
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should display results', () => {
    let search = this.fixture.componentInstance;
    search.ngOnInit();
    inputElement.value = 'Plone';
    inputElement.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
    this.fixture.whenStable().then(() => {
        expect(search.results.length).toEqual(2);
    });
  });
});

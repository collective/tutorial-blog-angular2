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

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';

describe('App: Frontend', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule]
    });
    this.fixture = TestBed.createComponent(AppComponent);
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = {
      'items': []
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have one header`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.querySelectorAll('header').length).toBe(1);
  }));
});

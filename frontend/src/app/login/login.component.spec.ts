/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

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

import { LoginService } from './login.service';
import { LoginComponent } from './login.component';

describe('Component: Login', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        LoginService,
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
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    });
    this.fixture = TestBed.createComponent(LoginComponent);
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = {
      "token": "something_long_long_long"
    };
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should authenticate', () => {
    let login = this.fixture.componentInstance;
    login.onSubmit({username: 'eric', password: 'secret'});
    expect(login.loginService.isLoggedIn()).toBeTruthy();
  });


});

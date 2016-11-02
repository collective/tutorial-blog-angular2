import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authentication_error = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form) {
    this.loginService.login(form.username, form.password).subscribe(
      data => {
        if (data === true) {
          this.router.navigate(['/']);
        }
      },
      err => {
        this.authentication_error = true;
        console.log('Can\'t get page. Error code: %s, URL: %s ',
                err.status, err.url);
       },
      () => console.log('Done')
    );
  }

}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authentication_error = false;
  @Input() username = '';
  @Input() password = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe(
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

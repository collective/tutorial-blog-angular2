import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent {
  username = '';
  password = '';
  authentication_error = false;
  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log('onSubmit');
    console.log(this.username);
    this.userService.login(this.username, this.password).subscribe(
      data => {
        if (data===true) {
          this.router.navigate(['']);
        }
      },
      err => {
        this.authentication_error = true;
        console.log("Can't get page. Error code: %s, URL: %s ",
                err.status, err.url);
       },
      () => console.log("Done")
    );
  }

}

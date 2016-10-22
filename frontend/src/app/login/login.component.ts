import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(email, password) {
    console.log('onSubmit');
    /*this.userService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['']);
      }
    });*/
    this.userService.login('admin', 'admin').subscribe(
      data => {
        if (data) {
          this.router.navigate(['']);
        }
      },
      err => console.log("Can't get page. Error code: %s, URL: %s ",
                err.status, err.url),
      () => console.log("Done")
    );
  }

}

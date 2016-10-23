import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  authentication_error = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  onSubmit(form) {
    this.userService.login(form.username, form.password).subscribe(
      data => {
        if (data===true) {
          this.router.navigate(['']);
        }
      },
      err => {
        this.authentication_error = true;
        console.log("Can't get page. Error code: %s, URL: %s ",
                err.status, err.url);
       }
    );
  }

}

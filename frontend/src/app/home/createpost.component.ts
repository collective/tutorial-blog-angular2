import { Component, OnInit } from '@angular/core';
import { HomepageService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './createpost.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomepageService]
})

export class CreatePostComponent {
  title = '';
  description = '';
  text = '';
  constructor(private homepageService: HomepageService, private router: Router) {}

  onSubmit() {
    console.log('onSubmit');
    console.log(this.title);
    this.homepageService.postBlogPosts(this.title, this.description, this.text).subscribe(
      data => {
        if (data===true) {
          this.router.navigate(['']);
        }
      },
      () => console.log("Done")
    );
  }

}

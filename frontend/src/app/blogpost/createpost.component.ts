import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from './blogpost.service';

@Component({
  selector: 'app-home',
  templateUrl: './createpost.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})

export class CreatePostComponent {
  title = '';
  description = '';
  text = '';
  constructor(private blogPostService: BlogPostService, private router: Router) {}

  onSubmit() {
    console.log('onSubmit');
    console.log(this.title);
    this.blogPostService.postBlogPosts(this.title, this.description, this.text).subscribe(
      data => {
        if (data === true) {
          this.router.navigate(['']);
        }
      },
      () => console.log('Done')
    );
  }

}

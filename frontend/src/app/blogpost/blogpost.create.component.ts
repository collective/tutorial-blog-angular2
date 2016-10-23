import { Component } from '@angular/core';
import { BlogPostService } from './blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './blogpost.create.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})

export class CreatePostComponent {
  title = '';
  description = '';
  text = '';
  constructor(private blogPostService: BlogPostService, private router: Router) {}

  onSubmit() {
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

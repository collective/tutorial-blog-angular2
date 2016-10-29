import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from './blogpost.service';

@Component({
  selector: 'app-home',
  templateUrl: './blogpost.create.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})

export class BlogpostCreateComponent {

  constructor(private blogPostService: BlogPostService, private router: Router) {}

  onSubmit(form) {
    this.blogPostService.postBlogPosts(form.title, form.description, form.text).subscribe(
      data => {
        if (data === true) {
          this.router.navigate(['']);
        }
      },
      () => console.log('Done')
    );
  }

}

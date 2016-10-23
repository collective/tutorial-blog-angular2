import { Component } from '@angular/core';
import { BlogPostService } from './blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})

export class PublishPostComponent {
  title = '';
  constructor(private blogPostService: BlogPostService, private router: Router) {}

  onSubmit() {
    console.log('onSubmit');
    debugger;
    console.log(this.title);
    this.blogPostService.publishBlogPosts(this.title).subscribe(
      data => {
        if (data === true) {
          this.router.navigate(['/blogPost.postId']);
        }
      },
      () => console.log('Done')
    );
  }

}

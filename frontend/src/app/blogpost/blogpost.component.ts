import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from './blogpost.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [BlogPostService]
})
export class BlogpostComponent implements OnInit {

  blogpostId: string;
  title: string;
  description: string;
  text: string;
  route: any;

  constructor(private blogPostService: BlogPostService, route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit() {
    let blogpostId = this.route.snapshot.params['path'];
    this.blogPostService.getBlogPost(blogpostId).subscribe( res => {
      this.title = res.title;
      this.description = res.description;
      this.text = res.text.data;
    });
  }

}

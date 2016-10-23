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

  title: string;
  description: string;
  text: string;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let path = params['path'];
      this.blogPostService.getBlogPost(path).subscribe(item => {
        this.title = item.title;
        this.description = item.description;
        this.text = item.text.data;
      });
    });
  }

}

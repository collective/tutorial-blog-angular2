import { Component, OnInit } from '@angular/core';
import { HomepageService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomepageService]
})
export class HomeComponent implements OnInit {

  blogPosts: any;

  constructor(private homepageService: HomepageService) { }

  ngOnInit() {
    this.homepageService.getBlogPosts().subscribe( res => {
      this.blogPosts = res;
    });
  }
}

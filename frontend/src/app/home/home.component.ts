import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  blogPosts: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getBlogPosts().subscribe( res => {
      this.blogPosts = res;
    });
  }
}

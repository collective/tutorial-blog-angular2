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
    })
    // this.blogPosts = [
    //   {
    //     'id': 1,
    //     'title': 'Getting Started With Plone Testing',
    //     'description': 'bobtemplates.plone is a package skeleton generator that gives you an easy start with Plone testing.'
    //   },
    //   {
    //     'id': 2,
    //     'title': 'Continuous Integration for Plone',
    //     'description': 'How we set up a new distributed Continuous Integration...'
    //   }
    // ];
  }

}

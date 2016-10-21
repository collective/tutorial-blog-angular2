import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  title: string;
  description: string;
  text: string;

  constructor() { }

  ngOnInit() {
    this.title = 'Getting Started With Plone Testing';
    this.description = 'bobtemplates.plone is a package skeleton generator that gives you an easy start with Plone testing.';
    this.text = '<p>The Plone Testing & Continuous Integration team worked hard over the last few months setting up an a new ...</p>';
  }

}

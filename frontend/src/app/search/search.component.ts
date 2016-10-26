import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  results: any;
  term = new FormControl();

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.term.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap((query: string) => this.searchService.search(query))
    .subscribe(res => {
      this.results = res;
    });
  }
}

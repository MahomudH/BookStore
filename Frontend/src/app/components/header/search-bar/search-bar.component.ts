import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  search = '';

  constructor(private _bookService: BookService) {}

  ngOnInit(): void {}

  onSearch() {
    if (this.search != '') {
      this._bookService.getBooks(this.search);
      this.search = '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
})
export class AllBooksComponent implements OnInit {
  constructor(private _bookService: BookService) {}
  filter: string = '';

  ngOnInit(): void {
    this._bookService.getBooks('');
  }

  get books(): Book[] {
    return this._bookService.books;
  }
}

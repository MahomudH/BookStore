import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
})
export class NewBooksComponent implements OnInit {

  constructor(private _bookService: BookService) {}

  ngOnInit(): void {
    this._bookService.getLastSixBooks();
  }

  get books(): Book[] {
    return this._bookService.newBooks;
  }

 
}

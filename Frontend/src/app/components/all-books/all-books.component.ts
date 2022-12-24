import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
})
export class AllBooksComponent implements OnInit {
  books: Book[];
  constructor(private _bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this._bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data.map((item) => {
          return {
            ...item,
            image: environment.baseUrlWithoutApi + 'Images/' + item.image,
          };  
        });
      },
    });
  }
}

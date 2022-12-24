import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
})
export class NewBooksComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getLastSixBooks().subscribe({
      next: response => {
        this.books = response.map((item) => {
          return {
            ...item,
            image: environment.baseUrlWithoutApi + 'Images/' + item.image,
          };  
        });
      }
    });
  }
}

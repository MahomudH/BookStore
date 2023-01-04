import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Book,
  CreateBookInput,
  MostBookSalesDto,
  UpdateBookInput,
} from '../Interfaces/Book';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.baseUrl;
  books: Book[] = [];
  newBooks:Book[] = [];

  constructor(private http: HttpClient) {}

  getBooks(filter: string) {
    if (this.books.length > 0) return of(this.books);
    return this.http.get<Book[]>(this.baseUrl + 'Books/' + filter).subscribe({
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

  getBookById(bookId: number) {
    // const book = this.books.find((x) => x.id === bookId);
    // if(book !== undefined) return of(book);
    return this.http.get<Book>(this.baseUrl + 'Books/' + bookId);
  }

  addBook(book: CreateBookInput) {
    let formData = new FormData();
    formData.append('Name', book.name);
    formData.append('Price', book.price.toString());
    formData.append('Discount', book.discount.toString());
    formData.append('Image', book.image);
    formData.append('About', book.about);
    formData.append('PageCount', book.pageCount.toString());
    formData.append('AuthorId', book.authorId.toString());
    formData.append('PublisherId', book.publisherId.toString());
    formData.append('TranslatorId', book.translatorId.toString());
    formData.append('CategoryId', book.categoryId.toString());

    return this.http.post(this.baseUrl + 'Books', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updateBook(book: UpdateBookInput) {
    let formData = new FormData();
    formData.append('Id', book.id.toString());
    formData.append('Name', book.name);
    formData.append('Price', book.price.toString());
    formData.append('Discount', book.discount.toString());
    formData.append('Image', book.image);
    formData.append('About', book.about);
    formData.append('PageCount', book.pageCount.toString());
    formData.append('AuthorId', book.authorId.toString());
    formData.append('PublisherId', book.publisherId.toString());
    formData.append('TranslatorId', book.translatorId.toString());
    formData.append('CategoryId', book.categoryId.toString());

    return this.http.put<Book>(this.baseUrl + 'Books', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deleteBook(bookId: number) {
    return this.http.delete<boolean>(this.baseUrl + 'Books/' + bookId);
  }

  getLastSixBooks() {
    if (this.newBooks.length > 0) return of(this.newBooks);
    return this.http.get<Book[]>(this.baseUrl + 'Books/getLastBook').subscribe({
      next: (data) => {
        this.newBooks = data.map((item) => {
          return {
            ...item,
            image: environment.baseUrlWithoutApi + 'Images/' + item.image,
          };
        });
      },
    });
  }

  getTheMostSoldBook() {
    return this.http.get<MostBookSalesDto>(
      this.baseUrl + 'Books/getMostBookSales'
    );
  }

  getTheMostOrderedBook() {
    return this.http.get<MostBookSalesDto>(
      this.baseUrl + 'Books/getMostBookOrdered'
    );
  }
}

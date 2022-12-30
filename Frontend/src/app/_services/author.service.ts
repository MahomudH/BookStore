import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../Interfaces/Author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  baseUrl = environment.baseUrl;
  authors: Author[] = [];

  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get<Author[]>(this.baseUrl + 'Author').subscribe({
      next: (result) => {
        this.authors = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAuthorById(authorId: number) {
    this.http.get<Author>(this.baseUrl + 'Author/' + authorId);
  }

  addAuthor(author: Author) {
    return this.http.post(this.baseUrl + 'Author', author);
  }

  updateAuthor(author: Author) {
    return this.http.put(this.baseUrl + 'Author', author);
  }

  deleteAuthor(authorId: number) {
    return this.http.delete<boolean>(this.baseUrl + 'Author/' + authorId);
  }
}

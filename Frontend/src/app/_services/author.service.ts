import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../Interfaces/Author';
import { Subject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  baseUrl = environment.baseUrl;
  authors: Author[] = [];
  private refresh = new Subject<void>();

  constructor(private http: HttpClient) {}

  get RefreshReq() {
    return this.refresh;
  }

  getAuthors() {
    if (this.authors.length > 0) return of(this.authors);

    return this.http
      .get<Author[]>(this.baseUrl + 'Author')
      .pipe(
        tap(() => {
          this.RefreshReq.next();
        })
      )
      .subscribe({
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

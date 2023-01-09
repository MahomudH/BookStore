import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Translator } from '../Interfaces/Translator';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  baseUrl = environment.baseUrl;
  translators: Translator[] = [];

  constructor(private http: HttpClient) {}

  getTranslators() {
    // if (this.translators.length > 0) return of(this.translators);
    return this.http.get<Translator[]>(this.baseUrl + 'Translator').subscribe({
      next: (result) => {
        this.translators = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getTranslatorById(translatorId: number) {
    this.http.get<Translator>(this.baseUrl + 'Translator/' + translatorId);
  }

  addTranslator(translator: Translator) {
    return this.http.post(this.baseUrl + 'Translator', translator);
  }

  updateTranslator(translator: Translator) {
    return this.http.put(this.baseUrl + 'Translator', translator);
  }

  deleteTranslator(translatorId: number) {
    return this.http.delete<boolean>(
      this.baseUrl + 'Translator/' + translatorId
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BuyBookInput } from '../Interfaces/Slae';
import { Book } from '../Interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseURL = environment.baseUrl + 'Sales';
  private numberOfSales = 0;

  constructor(private http: HttpClient) {}

  buyBook(sale: BuyBookInput) {
    return this.http.post<Book>(this.baseURL, sale);
  }

  getNumberOfSales() {
    return this.numberOfSales;
  }

  addNumberOfSales() {
    this.numberOfSales++;
  }
}

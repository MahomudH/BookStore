import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BuyBookInput, ShowSalesForUserDto } from '../Interfaces/Slae';
import { Book } from '../Interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseURL = environment.baseUrl + 'Sales';
  private numberOfSales = 0;

  constructor(private http: HttpClient) {}

  buyBook(sale: BuyBookInput) {
    this.numberOfSales++;
    return this.http.post<Book>(this.baseURL, sale);
  }

  getAllSalesForUser(){
    return this.http.get<ShowSalesForUserDto[]>(this.baseURL+'/getUsersales')
  }

  getNumberOfSales() {
    return this.numberOfSales;
  }

  addNumberOfSales() {
    this.numberOfSales++;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  BuyBookInput,
  ShowSalesForAdminDto,
  ShowSalesForUserDto,
} from '../Interfaces/Slae';
import { Book } from '../Interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseURL = environment.baseUrl + 'Sales';
  private numberOfSales = 0;
  sales: ShowSalesForAdminDto[] = [];

  constructor(private http: HttpClient) {}

  buyBook(sale: BuyBookInput) {
    this.numberOfSales++;
    return this.http.post<Book>(this.baseURL, sale);
  }

  getAllSalesForUser() {
    return this.http.get<ShowSalesForUserDto[]>(this.baseURL + '/getUsersales');
  }

  getAllOrdersForUser() {
    return this.http.get<ShowSalesForUserDto[]>(this.baseURL + '/getUserOrders');
  }

  getAllSalesForAdmin() {
    return this.http.get<ShowSalesForAdminDto[]>(this.baseURL).subscribe({
      next: (data) => {
        this.sales = data.map((item) => {
          return {
            ...item,
            bookImage:
              environment.baseUrlWithoutApi + 'Images/' + item.bookImage,
          };
        });
      },
    });
  }

  getNumberOfSales() {
    return this.numberOfSales;
  }

  addNumberOfSales() {
    this.numberOfSales++;
  }

  agreeSale(saleId: number) {
    return this.http.put(this.baseURL + '/agreeSold', saleId);
  }

  rejectSale(saleId: number) {
    return this.http.put(this.baseURL + '/rejectSold', saleId);
  }
}

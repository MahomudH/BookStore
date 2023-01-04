import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  BuyBookInput,
  ShowSalesForAdminDto,
  ShowSalesForUserDto,
} from '../Interfaces/Slae';
import { Book } from '../Interfaces/Book';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseURL = environment.baseUrl + 'Sales';
  private numberOfOrders = 0;
  sales: ShowSalesForAdminDto[] = [];

  constructor(private http: HttpClient) {
    this.getNumberOfOrdersForUser();
  }

  buyBook(sale: BuyBookInput) {
    this.numberOfOrders++;
    return this.http.post<Book>(this.baseURL, sale);
  }

  getAllSalesForUser() {
    return this.http.get<ShowSalesForUserDto[]>(this.baseURL + '/getUsersales');
  }

  getAllOrdersForUser() {
    return this.http.get<ShowSalesForUserDto[]>(
      this.baseURL + '/getUserOrders'
    );
  }

  getAllSalesForAdmin() {
    if (this.sales.length > 0) return of(this.sales);
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

  getNumberOfOrdersForUser() {
    return this.http
      .get<number>(this.baseURL + '/getUserOrdersNumber')
      .subscribe((result) => {
        this.numberOfOrders = result;
      });
  }

  getNumberOfSales() {
    return this.numberOfOrders;
  }

  addNumberOfSales() {
    this.numberOfOrders++;
  }

  agreeSale(saleId: number) {
    return this.http.put(this.baseURL + '/agreeSold', saleId);
  }

  rejectSale(saleId: number) {
    return this.http.put(this.baseURL + '/rejectSold', saleId);
  }


}

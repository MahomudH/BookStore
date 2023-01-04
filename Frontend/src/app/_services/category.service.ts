import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, CreateGategoryInput } from '../Interfaces/Category';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseUrl;
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  getCategories() {
    if (this.categories.length > 0) return of(this.categories);
    return this.http.get<Category[]>(this.baseUrl + 'Categories').subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }

  getCategoryById(categoryId: number) {
    this.http.get<Category>(this.baseUrl + 'Categories/' + categoryId);
  }

  addCategory(category: CreateGategoryInput) {
    return this.http.post(this.baseUrl + 'Categories', category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.baseUrl + 'Categories', category);
  }

  deleteCategory(categoryId: number) {
    return this.http.delete<boolean>(this.baseUrl + 'Categories/' + categoryId);
  }
}

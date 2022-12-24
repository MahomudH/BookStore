import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, CreateGategoryInput } from '../Interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'Categories');
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

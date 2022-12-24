import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  baseURL = environment.baseUrl + 'Sales';
  
  constructor(private http:HttpClient) { }

buyBook(){
  
}
}

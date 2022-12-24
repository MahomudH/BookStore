import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StaticPage, UpdateStaticPageInput } from '../Interfaces/StaticPage';

@Injectable({
  providedIn: 'root'
})
export class StaticPageService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  
  getStaticPages() {
    return this.http.get<StaticPage[]>(this.baseUrl + 'StaticPages');
  }

  getStaticPageById(staticPageId: number) {
   return this.http.get<StaticPage>(this.baseUrl + 'StaticPages/' + staticPageId);
  }

  updateStaticPage(staticPage: UpdateStaticPageInput) {
    return this.http.put(this.baseUrl + 'StaticPages', staticPage);
  }


}

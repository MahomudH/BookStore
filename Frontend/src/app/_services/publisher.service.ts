import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publisher } from '../Interfaces/Publisher';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  baseUrl = environment.baseUrl;
  publishers: Publisher[] = [];

  constructor(private http: HttpClient) {}

  getPublishers() {
    return this.http.get<Publisher[]>(this.baseUrl + 'Publishers').subscribe({
      next: (result) => {
        this.publishers = result.map((item) => {
          return {
            ...item,
            logo: environment.baseUrlWithoutApi + 'Images/' + item.logo,
          };
        });
      },
    });
  }

  getPublisherById(publisherId: number) {
    this.http.get<Publisher>(this.baseUrl + 'Publishers/' + publisherId);
  }

  addPublisher(publisher: Publisher) {
    let formData = new FormData();
    formData.append('Name', publisher.name);
    formData.append('Logo', publisher.logo);
    return this.http.post<Publisher>(this.baseUrl + 'Publishers/', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updatePublisher(publisher: Publisher) {
    let formData = new FormData();
    formData.append('Id', publisher.id.toString());
    formData.append('Name', publisher.name);
    formData.append('Logo', publisher.logo);
    return this.http.put<Publisher>(this.baseUrl + 'Publishers/', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deletePublisher(publisherId: number) {
    return this.http.delete<boolean>(
      this.baseUrl + 'Publishers/' + publisherId
    );
  }
}

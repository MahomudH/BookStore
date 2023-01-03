import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/Interfaces/Publisher';
import { PublisherService } from 'src/app/_services/publisher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
})
export class NewPublisherComponent implements OnInit {
  publishers: Publisher[];

  constructor(private _publisherService: PublisherService) {}

  ngOnInit(): void {
    this.getPublishers();
  }

  getPublishers() {
    this._publisherService.getLastSixPublisher().subscribe({
      next: (response) => {
  
        this.publishers = response.map((item) => {
          return {
            ...item,
            logo: environment.baseUrlWithoutApi + 'Images/' + item.logo,
          };
        });
      },
    });
  }
}

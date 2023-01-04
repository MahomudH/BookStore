import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/Interfaces/Publisher';
import { PublisherService } from 'src/app/_services/publisher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
})
export class NewPublisherComponent implements OnInit {

  constructor(private _publisherService: PublisherService) {}

  ngOnInit(): void {
    this._publisherService.getLastSixPublisher();
  }

  get publishers(): Publisher[] {
    return this._publisherService.newPublishers;
  }

}

import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Publisher } from 'src/app/Interfaces/Publisher';
import { PublisherService } from 'src/app/_services/publisher.service';
import { environment } from 'src/environments/environment';
import { CreateOrEditPublisherComponent } from './create-or-edit-publisher/create-or-edit-publisher.component';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
})
export class PublisherComponent implements OnInit {
  progressValue: string;
  imageSrc: string;

  constructor(
    private _publisherService: PublisherService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._publisherService.getPublishers();
  }

  get publishers(): Publisher[] {
    return this._publisherService.publishers;
  }

  onDelete(publisherId: number) {
    this._publisherService.deletePublisher(publisherId).subscribe((response) => {
      this._publisherService.getPublishers();
    });
  }

  onCreate() {
    this.matDialog.open(CreateOrEditPublisherComponent, {
      width: '50%',
      data: {
        updateMood: false,
      },
    });
  }

  onUpdate(index: number) {
    this.matDialog.open(CreateOrEditPublisherComponent, {
      width: '50%',
      data: {
        updateMood: true,
        name: this.publishers[index].name,
        id: this.publishers[index].id,
        logo: this.publishers[index].logo,
      },
    });
  }
}

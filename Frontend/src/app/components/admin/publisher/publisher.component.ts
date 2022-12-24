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
  publishers: Publisher[];
  progressValue: string;
  imageSrc: string;


  constructor(
    private publisherService: PublisherService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllPublishers();
  }

  reloadPage() {
    this.getAllPublishers();
  }

  getAllPublishers() {
    this.publisherService.getPublishers().subscribe({
      next: (data) => {
        this.publishers = data.map((item) => {
          return {
            ...item,
            logo: environment.baseUrlWithoutApi + 'Images/' + item.logo,
          };
        });
      },
    });
  }

  onDelete(publisherId: number) {
    this.publisherService.deletePublisher(publisherId).subscribe((response) => {
      this.reloadPage();
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
      },
    });
  }
}

import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Publisher } from 'src/app/Interfaces/Publisher';
import { PublisherService } from 'src/app/_services/publisher.service';

@Component({
  selector: 'app-create-or-edit-publisher',
  templateUrl: './create-or-edit-publisher.component.html',
})
export class CreateOrEditPublisherComponent implements OnInit {
  CreateOrEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _publisherService: PublisherService,
    private toastr: ToastrService,
    private ref: MatDialogRef<CreateOrEditPublisherComponent>
  ) {}

  ngOnInit(): void {
    this.CreateOrEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });
    if (this.data.updateMood) {
      this.CreateOrEditForm.patchValue({
        name: this.data.name,
        id: this.data.id,
      });
    }
  }

  createOrEditPublisher() {
    if (this.CreateOrEditForm.valid) {
      if (this.data.updateMood) {
        this.updatePublisher();
      } else {
        this.createPublisher();
      }
    }
  }

  updatePublisher() {
    let newPublisher: Publisher = this.CreateOrEditForm.value;
    newPublisher.logo = this.CreateOrEditForm.value.fileSource;
    this._publisherService.updatePublisher(newPublisher).subscribe({
      next: (data) => {
        if (data.type == HttpEventType.Response) {
          this.toastr.success('تم تعديل دار النشر بنجاح');
          this.ref.close();
        }
      },
      error: () => {
        this.toastr.error('حدث خطا اثناء عملية الاضافة');
        this.ref.close();
      },
    });
  }

  createPublisher() {
    let newPublisher: Publisher = this.CreateOrEditForm.value;
    newPublisher.logo = this.CreateOrEditForm.value.fileSource;
    this._publisherService.addPublisher(newPublisher).subscribe({
      next: (data) => {
        if (data.type == HttpEventType.Response) {
          this.toastr.success('تم اضافة دار نشر جديدة بنجاح');
          this.ref.close();
        }
      },
      error: () => {
        this.toastr.error('حدث خطا اثناء عملية الاضافة');
        this.ref.close();
      },
    });
  }

  get name() {
    return this.CreateOrEditForm.get('name')!;
  }

  get logo() {
    return this.CreateOrEditForm.get('logo')!;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files!;
    if (files.length > 0) {
      const file = files[0];
      this.CreateOrEditForm.patchValue({
        fileSource: file,
      });
    }
  }
}

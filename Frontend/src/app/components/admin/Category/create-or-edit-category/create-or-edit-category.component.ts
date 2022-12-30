import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-create-or-edit-category',
  templateUrl: './create-or-edit-category.component.html',
})
export class CreateOrEditCategoryComponent implements OnInit {
  CreateOrEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryService,
    private toastr: ToastrService,
    private ref: MatDialogRef<CreateOrEditCategoryComponent>
  ) {}

  ngOnInit(): void {
    this.CreateOrEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });
    if (this.data.updateMood) {
      this.CreateOrEditForm.patchValue({
        name: this.data.name,
        id: this.data.id,
      });
    }
  }

  createOrEditCategory() {
    if (this.CreateOrEditForm.valid) {
      if (this.data.updateMood) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    }
  }

  updateCategory() {
    this._categoryService.updateCategory(this.CreateOrEditForm.value).subscribe(
      (response) => {
        this._categoryService.getCategories();
        this.toastr.success('تم تعديل القسم بنجاح');
        this.ref.close();
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية التعديل');
        this.ref.close();
      }
    );
  }

  createCategory() {
    this._categoryService.addCategory(this.CreateOrEditForm.value).subscribe(
      (response) => {
        this._categoryService.getCategories();
        this.toastr.success('تم اضافة قسم بنجاح');
        this.ref.close();
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية الاضافة');
        this.ref.close();
      }
    );
  }

  get name() {
    return this.CreateOrEditForm.get('name')!;
  }
}

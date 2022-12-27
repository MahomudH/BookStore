import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Interfaces/Category';
import { CategoryService } from 'src/app/_services/category.service';
import { CreateOrEditCategoryComponent } from '../create-or-edit-category/create-or-edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  
  constructor(
    private _categoryService: CategoryService,
    private matDialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  reloadPage() {
    this.getAllCategories();
  }

  getAllCategories() {
    this._categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onDelete(categoryId: number) {
    this._categoryService.deleteCategory(categoryId).subscribe(
      (response) => {
        this.reloadPage();
        this.toastr.success('تم حذف القسم بنجاح');
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية الحذف');
      }
    );
  }

  openModal() {
    this.matDialog.open(CreateOrEditCategoryComponent, {
      width: '50%',
      data: {
        updateMood: false,
      },
    });
  }

  onUpdate1(index: number) {
    this.matDialog.open(CreateOrEditCategoryComponent, {
      width: '50%',
      data: {
        updateMood: true,
        name: this.categories[index].name,
        id: this.categories[index].id,
      },
    });
  }
}

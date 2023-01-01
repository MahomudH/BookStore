import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
import { PublisherService } from 'src/app/_services/publisher.service';
import { TranslatorService } from 'src/app/_services/translator.service';
import { ShowBookDetailsForAdminComponent } from '../book/show-book-details-for-admin/show-book-details-for-admin.component';
import { Book } from 'src/app/Interfaces/Book';
import { SalesService } from 'src/app/_services/sales.service';
import { ShowSalesForAdminDto } from 'src/app/Interfaces/Slae';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  filter: string = '';

  constructor(
    private _salesService: SalesService,
    private _authorService: AuthorService,
    private _publisherService: PublisherService,
    private _translatorService: TranslatorService,
    private _categoryService: CategoryService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._authorService.getAuthors();
    this._publisherService.getPublishers();
    this._translatorService.getTranslators();
    this._categoryService.getCategories();
    this._salesService.getAllSalesForAdmin();
  }

  get sales(): ShowSalesForAdminDto[] {
    return this._salesService.sales;
  }

  onAgree(index: number) {
    console.log(this.sales[index].id);
    this._salesService.agreeSale(this.sales[index].id).subscribe({
      next: (result) => {
        this._salesService.getAllSalesForAdmin();
        this.toastr.success('تم الموافقة على الطلب');
      },
      error: (err) => {
        this.toastr.error('حدث خطا اثناء الموافقة على الطلب');
      },
    });
  }

  onReject(index: number) {
    console.log(this.sales[index].id);
    
    this._salesService.rejectSale(this.sales[index].id).subscribe({
      next: (result) => {
        this._salesService.getAllSalesForAdmin();
        this.toastr.success('تم رفض الطلب');
      },
      error: (err) => {
        this.toastr.error('حدث خطا اثناء رفض الطلب');
      },
    });
  }
}

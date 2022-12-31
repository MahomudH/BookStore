import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, MostBookSalesDto } from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';
import { environment } from 'src/environments/environment';
import { ShowBookDetailsForAdminComponent } from '../book/show-book-details-for-admin/show-book-details-for-admin.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  mostSoldBook: MostBookSalesDto;

  constructor(
    private _bookService: BookService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTheMostSoldBook();
  }

  getTheMostSoldBook() {
    this._bookService.getTheMostSoldBook().subscribe({
      next: (data) => {
        this.mostSoldBook = data;
        this.mostSoldBook.image =
          environment.baseUrlWithoutApi + 'Images/' + this.mostSoldBook.image;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onShow() {
    this.matDialog.open(ShowBookDetailsForAdminComponent, {
      width: '50%',
      data: {
        updateMood: true,
        name: this.mostSoldBook.name,
        price: this.mostSoldBook.price,
        image: this.mostSoldBook.image,
        discount: this.mostSoldBook.discount,
        about: this.mostSoldBook.about,
        publishYear: this.mostSoldBook.publishYear,
        pageCount: this.mostSoldBook.pageCount,
        authorName: this.mostSoldBook.authorName,
        publisherName: this.mostSoldBook.publisherName,
        translatorName: this.mostSoldBook.translatorName,
        categoryName: this.mostSoldBook.categoryName,
      },
    });
  }
}

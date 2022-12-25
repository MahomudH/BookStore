import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Interfaces/Book';
import { BuyBookInput } from 'src/app/Interfaces/Slae';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { SalesService } from 'src/app/_services/sales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-book-details',
  templateUrl: './show-book-details.component.html',
  styleUrls: ['./show-book-details.component.css'],
})
export class ShowBookDetailsComponent implements OnInit {
  bookId: number;
  book: Book = new Book();
  activeTab = 1;
  countOfBook = 0;

  constructor(
    private _bookService: BookService,
    private route: ActivatedRoute,
    private _salesService: SalesService,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    this.getBookBy();
  }

  getBookBy() {
    this._bookService.getBookById(this.bookId).subscribe((response) => {
      this.book = response;
      this.book.image =
        environment.baseUrlWithoutApi + 'Images/' + this.book.image;
    });
  }

  setActiveTab(i: number) {
    this.activeTab = i;
  }

  buyBook() {
    if (this._authService.getToken() === null)
      this.router.navigate(['auth/login']);
    let sale = new BuyBookInput();

    sale.bookId = this.bookId;
    sale.amount = this.countOfBook;
    sale.totalPrice = this.countOfBook * this.book.price;

    console.log(sale);
    this._salesService.buyBook(sale).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}

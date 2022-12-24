import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-book-details',
  templateUrl: './show-book-details.component.html',
  styleUrls: ['./show-book-details.component.css'],
})
export class ShowBookDetailsComponent implements OnInit {
  bookId: number;
  book: Book= new Book();;
  activeTab = 1;
  //BuyBookFrom: FormGroup;

  constructor(
    private _bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.BuyBookFrom = new FormGroup({
    //   count: new FormControl('', [Validators.required]),
    //   bookId: new FormControl(''),
    // });
    

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

  buyBook() {}
}

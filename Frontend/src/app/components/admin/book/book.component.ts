import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/Interfaces/Author';
import { Book, CreateBookInput } from 'src/app/Interfaces/Book';
import { Category } from 'src/app/Interfaces/Category';
import { Publisher } from 'src/app/Interfaces/Publisher';
import { Translator } from 'src/app/Interfaces/Translator';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
import { PublisherService } from 'src/app/_services/publisher.service';
import { TranslatorService } from 'src/app/_services/translator.service';
import { environment } from 'src/environments/environment';
import { CreateOrEditBookComponent } from './create-or-edit-book/create-or-edit-book.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  books: Book[];
  allAuthors: Author[];
  allPublishers: Publisher[];
  allTranslators: Translator[];
  allCategories: Category[];



  constructor(
    private _bookService: BookService,
    private _authorService: AuthorService,
    private _publisherService: PublisherService,
    private _translatorService: TranslatorService,
    private _categoryService: CategoryService,
    private toastr : ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    this.getAllPublishers();
    this.getAllAuthors();
    this.getAllTranslators();
    this.getAllCategories();
    this.getAllBooks();
  }

  reloadPage() {
    this.getAllBooks();
  }

  getAllBooks() {
    this._bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data.map((item) => {
          return {
            ...item,
            image: environment.baseUrlWithoutApi + 'Images/' + item.image,
          };  
        });
      },
    });
  }

  onDelete(bookId: number) {
    this._bookService.deleteBook(bookId).subscribe((response) => {
      this.reloadPage();
      this.toastr.success('تم حذف الكتاب بنجاح');
    },error => {
      this.toastr.error('حذث خطا اثناء عملية الحذف');
    });
  }

  onCreate(){
    this.matDialog.open(CreateOrEditBookComponent, {
      width: '50%',
      data: {
        updateMood: false,
        allAuthors: this.allAuthors,
        allCategories: this.allCategories,
        allPublishers:this.allPublishers,
        allTranslators:this.allTranslators
      },
    });
  }
  
  onUpdate(index: number) {
    this.matDialog.open(CreateOrEditBookComponent, {
      width: '50%',
      data: {
        updateMood: true,
        id:this.books[index].id,
        name: this.books[index].name,
        price: this.books[index].price,
        discount: this.books[index].discount,
        about: this.books[index].about,
        publishYear: this.books[index].publishYear,
        pageCount: this.books[index].pageCount,
        authorId: this.books[index].authorId,
        publisherId : this.books[index].publisherId,
        translatorId: this.books[index].translatorId,
        categoryId: this.books[index].categoryId,
        allAuthors: this.allAuthors,
        allCategories: this.allCategories,
        allPublishers:this.allPublishers,
        allTranslators:this.allTranslators
      },
    });
  }

  onShow(index: number){
    
  }

  getAllAuthors() {
    this._authorService.getAuthors().subscribe({
      next: (response) => {
        this.allAuthors = response;
      },
    });
  }

  getAllPublishers() {
    this._publisherService.getPublishers().subscribe({
      next: (response) => {
        this.allPublishers = response;
      },
    });
  }

  getAllTranslators() {
    this._translatorService.getTranslators().subscribe({
      next: (response) => {
        this.allTranslators = response;
      },
    });
  }

  getAllCategories() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        this.allCategories = response;
      },
    });
  }
}

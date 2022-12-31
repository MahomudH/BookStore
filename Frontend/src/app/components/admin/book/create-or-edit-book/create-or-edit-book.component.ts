import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  Book,
  CreateBookInput,
  UpdateBookInput,
} from 'src/app/Interfaces/Book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-create-or-edit-book',
  templateUrl: './create-or-edit-book.component.html',
})
export class CreateOrEditBookComponent implements OnInit {
  CreateOrEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _bookService: BookService,
    private toastr: ToastrService,
    private ref: MatDialogRef<CreateOrEditBookComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this.CreateOrEditForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      discount: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
      pageCount: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      translator: new FormControl(''),
      category: new FormControl('', [Validators.required]),
    });

    if (this.data.updateMood) {
      this.CreateOrEditForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        price: this.data.price,
        discount: this.data.discount,
        about: this.data.about,
        publishYear: this.data.publishYear,
        pageCount: this.data.pageCount,
        author: this.data.authorId,
        publisher: this.data.publisherId,
        translator: this.data.translatorId,
        category: this.data.categoryId,
      });
    }
  }

  createOrEditBook() {
    if (this.CreateOrEditForm.valid) {
      if (this.data.updateMood) {
        this.updateBook();
      } else {
        this.createBook();
      }
    }
  }

  updateBook() {
    let newBook: UpdateBookInput = this.CreateOrEditForm.value;
    newBook.image = this.CreateOrEditForm.value.fileSource;
    newBook.authorId = this.CreateOrEditForm.value.author;
    newBook.publisherId = this.CreateOrEditForm.value.publisher;
    newBook.categoryId = this.CreateOrEditForm.value.category;
    newBook.translatorId = this.CreateOrEditForm.value.translator;
    this._bookService.updateBook(newBook).subscribe({
      next: (data) => {
        if (data.type == HttpEventType.Response) {
          this._bookService.getBooks('');
          this.toastr.success('تم تعديل الكتاب بنجاح');
          this.ref.close();
        }
      },
      error: () => {
        this.toastr.error('حدث خطا اثناء عملية الاضافة');
        this.ref.close();
      },
    });
  }

  createBook() {
    let newBook: CreateBookInput = this.CreateOrEditForm.value;
    newBook.image = this.CreateOrEditForm.value.fileSource;
    newBook.authorId = this.CreateOrEditForm.value.author;
    newBook.publisherId = this.CreateOrEditForm.value.publisher;
    newBook.categoryId = this.CreateOrEditForm.value.category;
    newBook.translatorId = this.CreateOrEditForm.value.translator;
    this._bookService.addBook(newBook).subscribe({
      next: (data) => {
        if (data.type == HttpEventType.Response) {
          this._bookService.getBooks('');
          this.toastr.success('تم اضافة كتاب جديدة بنجاح');
          this.ref.close();
        }
      },
      error: () => {
        this.toastr.error('حدث خطا اثناء عملية الاضافة');
        this.ref.close();
      },
    });
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

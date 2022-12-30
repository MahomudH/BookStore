import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/Interfaces/Author';
import { AuthorService } from 'src/app/_services/author.service';
import { CreateOrEditAuthorComponent } from './create-or-edit-author/create-or-edit-author.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
})
export class AuthorComponent implements OnInit {
  constructor(
    private _authorService: AuthorService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._authorService.getAuthors();
  }

  get authors(): Author[] {
    return this._authorService.authors;
  }

  onDelete(categoryId: number) {
    this._authorService.deleteAuthor(categoryId).subscribe(
      (response) => {
        this._authorService.getAuthors();
        this.toastr.success('تم حذف القسم بنجاح');
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية الحذف');
      }
    );
  }

  onCreate() {
    this.matDialog.open(CreateOrEditAuthorComponent, {
      width: '50%',
      data: {
        updateMood: false,
      },
    });
  }

  onUpdate(index: number) {
    this.matDialog.open(CreateOrEditAuthorComponent, {
      width: '50%',
      data: {
        updateMood: true,
        name: this.authors[index].name,
        id: this.authors[index].id,
      },
    });
  }
}

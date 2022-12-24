import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/Interfaces/Author';
import { AuthorService } from 'src/app/_services/author.service';
import { CreateOrEditAuthorComponent } from './create-or-edit-author/create-or-edit-author.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit {
  authors: Author[];


  constructor(
    private authorService: AuthorService,
    private toastr : ToastrService,
    private matDialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllAuthors();
  }

  reloadPage() {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.authorService.getAuthors().subscribe((response) => {
      this.authors = response;
    });
  }

  onDelete(categoryId: number) {
    this.authorService.deleteAuthor(categoryId).subscribe(
      (response) => {
        this.reloadPage();
        this.toastr.success('تم حذف القسم بنجاح');
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية الحذف');
      });
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

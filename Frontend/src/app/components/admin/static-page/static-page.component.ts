import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaticPage, UpdateStaticPageInput } from 'src/app/Interfaces/StaticPage';
import { StaticPageService } from 'src/app/_services/static-page.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html'
})
export class StaticPageComponent implements OnInit {
  staticPages: StaticPage[];
  EditForm:FormGroup;

  constructor(
    private staticPageService: StaticPageService,
    private toastr : ToastrService,
    private matDialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllStaticPages();
    this.EditForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      datials: new FormControl('', [Validators.required]),
     
    });
  }

  reloadPage() {
    this.getAllStaticPages();
  }

  getAllStaticPages() {
    this.staticPageService.getStaticPages().subscribe((response) => {
      this.staticPages = response;
    });
  }

  onUpdate() {
  let updateStaticPage : UpdateStaticPageInput= this.EditForm.value;
  console.log(updateStaticPage);
  
  this.staticPageService.updateStaticPage(updateStaticPage).subscribe({
    next:response =>{
      this.reloadPage();
      this.toastr.success('تم تعديل الصفحة بنجاح');
    }
  });
  }
}

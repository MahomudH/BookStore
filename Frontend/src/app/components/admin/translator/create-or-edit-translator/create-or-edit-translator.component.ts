import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslatorService } from 'src/app/_services/translator.service';


@Component({
  selector: 'app-create-or-edit-translator',
  templateUrl: './create-or-edit-translator.component.html'
})
export class CreateOrEditTranslatorComponent implements OnInit {
  CreateOrEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _translatorService: TranslatorService,
    private toastr: ToastrService,
    private ref :MatDialogRef<CreateOrEditTranslatorComponent>
  ) {}

  ngOnInit(): void {
    this.CreateOrEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });
    if (this.data.updateMood) {
      this.CreateOrEditForm.patchValue({
        name: this.data.name,
        id: this.data.id,
      });
    }
  }

  createOrEditAuthor() {
    if(this.CreateOrEditForm.valid){
      if (this.data.updateMood) {
        this.updateAuthor();
      } else {
        this.createAuthor();
      }
    }
  }

  updateAuthor() {
    this._translatorService.updateTranslator(this.CreateOrEditForm.value).subscribe(
      (response) => {
        this.toastr.success('تم تعديل المؤلف بنجاح');
        this.ref.close();
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية التعديل');
        this.ref.close();
      }
    );
  }

  createAuthor() {    
    this._translatorService.addTranslator(this.CreateOrEditForm.value).subscribe(
      (response) => {
        this.toastr.success('تم اضافة المؤلف بنجاح');
      
        this.ref.close();
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية الاضافة');
        this.ref.close();
      }
    );
  }

  get name(){
    return this.CreateOrEditForm.get('name')!;
  }
}

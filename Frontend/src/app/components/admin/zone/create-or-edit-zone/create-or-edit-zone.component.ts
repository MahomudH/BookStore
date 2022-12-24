import { Component, OnInit,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ZoneService } from 'src/app/_services/zone.service';

@Component({
  selector: 'app-create-or-edit-zone',
  templateUrl: './create-or-edit-zone.component.html'
})
export class CreateOrEditZoneComponent implements OnInit {

  CreateOrEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _zoneService: ZoneService,
    private toastr: ToastrService,
    private ref :MatDialogRef<CreateOrEditZoneComponent>
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
    this._zoneService.updateZone(this.CreateOrEditForm.value).subscribe(
      (response) => {
        this.toastr.success('تم تعديل المنطقة بنجاح');
        this.ref.close();
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية التعديل');
        this.ref.close();
      }
    );
  }

  createAuthor() {    
    this._zoneService.addZone(this.CreateOrEditForm.value).subscribe(
      (response) => {
        this.toastr.success('تم اضافة المنطقة بنجاح');
      
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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Zone } from 'src/app/Interfaces/Zone';
import { ZoneService } from 'src/app/_services/zone.service';
import { CreateOrEditZoneComponent } from './create-or-edit-zone/create-or-edit-zone.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html'
})
export class ZoneComponent implements OnInit {
   zones: Zone[];

  constructor(
    private _zoneService: ZoneService,
    private toastr : ToastrService,
    private matDialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllZones();
  }

  reloadPage() {
    this.getAllZones();
  }

  getAllZones() {
    this._zoneService.getZones().subscribe((response) => {
      this.zones = response;
    });
  }

  onDelete(categoryId: number) {
    this._zoneService.deleteZone(categoryId).subscribe(
      (response) => {
        this.reloadPage();
        this.toastr.success('تم حذف المنطقة بنجاح');
      },
      (error) => {
        this.toastr.error('حدث خطا اثناء عملية الحذف');
      });
  }

  
  onCreate() {
    this.matDialog.open(CreateOrEditZoneComponent, {
      width: '50%',
      data: {
        updateMood: false,
      },
    });
  }

  
  onUpdate(index: number) {
    this.matDialog.open(CreateOrEditZoneComponent, {
      width: '50%',
      data: {
        updateMood: true,
        name: this.zones[index].name,
        id: this.zones[index].id,
      },
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-book-details-for-admin',
  templateUrl: './show-book-details-for-admin.component.html',
  styleUrls: ['show-book-details-for-admin.component.css'],
})
export class ShowBookDetailsForAdminComponent implements OnInit {
  activeTab = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  setActiveTab(i: number) {
    this.activeTab = i;
  }
}

import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SalesService } from 'src/app/_services/sales.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  numberOfSales = 10;
  isUserLogin = false;

  constructor(
    private _salesService: SalesService,
    private authSerivce: AuthService,
    private router : Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUserLoginOrNot();
  }

  get numberOfsales() {
    return this._salesService.getNumberOfSales();
  }

  isUserLoginOrNot() {
    this.authSerivce.getToken() == null
      ? (this.isUserLogin = false)
      : (this.isUserLogin = true);
  }

  logout(){
    this.authSerivce.logout();
    this.router.navigate(['/']);
    this.isUserLoginOrNot();
  }
}

import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { LoginOrRegisterPageService } from 'src/app/_services/login-or-register-page.service';
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
    private loginOrRegisterPageService: LoginOrRegisterPageService,
    private _salesService: SalesService,
    private authSerivce: AuthService,
    private router : Router
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

  changLoginORRegister(){
    this.loginOrRegisterPageService.changeIsThisPageLoginOrRegister();
  }
}

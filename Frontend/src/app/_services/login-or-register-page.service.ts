import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginOrRegisterPageService {
  private isThisPageLoginOrRegister = false;

  constructor() {}

  changeIsThisPageLoginOrRegister() {
    this.isThisPageLoginOrRegister = !this.isThisPageLoginOrRegister;
  }

  getIsThisPageLoginOrRegister(){
    return this.isThisPageLoginOrRegister;
  }
}

import { Component } from '@angular/core';
import { LoginOrRegisterPageService } from './_services/login-or-register-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'BookStore';

  constructor(
    private loginOrRegisterPageService: LoginOrRegisterPageService,
  ) {}
  
  get isRouterLoginOrRegister(){
    return this.loginOrRegisterPageService.getIsThisPageLoginOrRegister();
  }
}

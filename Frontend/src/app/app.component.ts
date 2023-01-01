import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BookStore';

  constructor(private route: Router) {}

  get isRouterLoginOrRegister() {
    if (this.route.url.match('/auth/')) {
      return true;
    }
    return false;
  }
}

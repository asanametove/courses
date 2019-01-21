import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  get loggedIn() {
    return this.loginService.isAuthenticated();
  }

  get loginShown() {
    return !this.loggedIn && this.router.url !== '/login';
  }

  logOut() {
    this.loginService.logOut();
  }
}

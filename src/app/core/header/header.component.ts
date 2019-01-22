import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  get loggedIn() {
    return this.loginService.isLoggedIn();
  }

  get loginShown() {
    const { login } = NavigationService.pages;
    return !this.loggedIn && !this.navigationService.isOnPage(login);
  }

  logOut() {
    this.loginService.logOut();
  }
}

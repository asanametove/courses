import { Component } from '@angular/core';
import { RouteName } from '@shared/route-name';
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
    return !this.loggedIn && !this.navigationService.isOnPage(RouteName.Login);
  }

  logOut() {
    this.loginService.logOut();
  }
}

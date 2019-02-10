import { Component, OnInit } from '@angular/core';
import { RouteName } from '@shared/route-name';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';
import { User } from '@shared/user';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit() {
    this.loginService.userInfo$
      .subscribe((user) => this.user = user);
  }

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

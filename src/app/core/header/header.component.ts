import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouteName } from '@shared/route-name';
import { User } from '@shared/user';
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

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => user.isLoggedIn),
    );
  }

  get isLoginShown$(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((isLoggedIn) => !isLoggedIn && !this.navigationService.isOnPage(RouteName.Login)),
    );
  }

  get user$(): Observable<User> {
    return this.loginService.user$;
  }

  logOut() {
    this.loginService.logOut();
  }
}

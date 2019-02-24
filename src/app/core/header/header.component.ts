import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.loginService.userInfo$
      .subscribe((user) => this.user = user);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loginService.isLoggedIn$;
  }

  get isLoginShown$(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((isLoggedIn) => !isLoggedIn && !this.navigationService.isOnPage(RouteName.Login)),
    );
  }

  logOut() {
    this.loginService.logOut();
  }
}

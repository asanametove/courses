import { Injectable } from '@angular/core';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';

const localStorageKeysMap = {
  userInfo: 'userInfo',
};

@Injectable()
export class LoginService {
  private _redirectUrl: string;

  constructor(
    private navigationService: NavigationService,
  ) {}

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  logIn(username: string, password: string): void {
    const userInfo = { username, password };
    localStorage.setItem(localStorageKeysMap.userInfo, JSON.stringify(userInfo));
    console.log('Log in', userInfo);

    if (this.redirectUrl) {
      this.navigationService.navigateByUrl(this.redirectUrl as RouteName);
      this.redirectUrl = null;
    }
  }

  logOut(): void {
    localStorage.removeItem(localStorageKeysMap.userInfo);
    console.log('Logged out');
    this.navigationService.navigateByUrl(RouteName.Login);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(localStorageKeysMap.userInfo);
  }

  getUserInfo(): any {
    const userInfo = JSON.parse(localStorage.getItem(localStorageKeysMap.userInfo));
    console.log(userInfo);
    return userInfo;
  }
}

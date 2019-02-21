import { Injectable } from '@angular/core';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { HttpClient } from '@angular/common/http';
import { LocalStorageKey } from '@shared/local-storage-keys';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@shared/user';
import * as api from '@shared/api';

@Injectable()
export class LoginService {
  private _redirectUrl: string;
  private _userInfo$ = new BehaviorSubject<User>(null);

  public userInfo$ = this._userInfo$.asObservable();
  public isLoggedIn$ = new Observable<boolean>((observer) => {
    observer.next(!!this.token);
  });

  constructor(
    private navigationService: NavigationService,
    private http: HttpClient,
  ) {
    this.updateUserInfo();
  }

  private updateUserInfo(): void {
    if (this.token) {
      this.http.post(api.userInfo, null)
        .subscribe((user: any) => this._userInfo$.next(user.name));
    } else {
      this._userInfo$.next(null);
    }
  }

  private get token(): string {
    return localStorage.getItem(LocalStorageKey.Token);
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  logIn(login: string, password: string): void {
    this.http.post(api.login, { login, password })
      .subscribe(({ token }: any) => {
        localStorage.setItem(LocalStorageKey.Token, token);
        this.updateUserInfo();
        if (this.redirectUrl) {
          this.navigationService.navigateByUrl(this.redirectUrl as RouteName);
          this.redirectUrl = null;
        }
      });
  }

  logOut(): void {
    localStorage.removeItem(LocalStorageKey.Token);
    console.log('Logged out');
    this.updateUserInfo();
    this.navigationService.navigateByUrl(RouteName.Login);
  }
}

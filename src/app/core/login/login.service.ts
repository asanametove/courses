import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { LocalStorageKey } from '@shared/local-storage-keys';
import { User } from '@shared/user';
import * as api from '@shared/api';
import { AppState, selectUser } from '@store/reducers';
import { Store } from '@ngrx/store';
import { Login, Logout } from '@store/actions/login-page.actions';

@Injectable()
export class LoginService {
  private _redirectUrl: string;

  public isLoggedIn$ = new Observable<boolean>((observer) => {
    observer.next(!!this.token);
  });

  constructor(
    private navigationService: NavigationService,
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.updateUserInfo();
  }

  private updateUserInfo(): void {
    if (this.token) {
      this.http.post(api.userInfo, null)
        .subscribe(({ name }: any) => this.store.dispatch(new Login(name)));
    }
  }

  private get token(): string {
    return localStorage.getItem(LocalStorageKey.Token);
  }

  private handleLoginResult = ({ token }: any) => {
    localStorage.setItem(LocalStorageKey.Token, token);
    this.updateUserInfo();
    if (this.redirectUrl) {
      this.navigationService.navigateByUrl(this.redirectUrl as RouteName);
      this.redirectUrl = null;
    }
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  get user$(): Observable<User> {
    return this.store.select(selectUser);
  }

  logIn(login: string, password: string): void {
    this.http.post(api.login, { login, password }).subscribe(
      this.handleLoginResult,
    );
  }

  logOut(): void {
    localStorage.removeItem(LocalStorageKey.Token);
    console.log('Logged out');
    this.store.dispatch(new Logout());
    this.navigationService.navigateByUrl(RouteName.Login);
  }
}

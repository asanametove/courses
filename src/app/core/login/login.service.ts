import { Injectable } from '@angular/core';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageKey } from '@shared/local-storage-keys';
import { Subject } from 'rxjs';
import { User } from '@shared/user';

@Injectable()
export class LoginService {
  private _redirectUrl: string;

  public userInfo$ = new Subject<User>();

  constructor(
    private navigationService: NavigationService,
    private http: HttpClient,
  ) {
    this.updateUserInfo();
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders(this.isLoggedIn()
      ? { Authorization: localStorage.getItem(LocalStorageKey.Token) }
      : {},
    );
  }

  private updateUserInfo(): void {
    if (this.isLoggedIn()) {
      this.http.post('http://localhost:3004/auth/userinfo', null, { headers: this.headers })
        .subscribe((user: any) => this.userInfo$.next(user.name));
    }
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  logIn(login: string, password: string): void {
    this.http.post('http://localhost:3004/auth/login', { login, password })
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
    this.navigationService.navigateByUrl(RouteName.Login);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(LocalStorageKey.Token);
  }
}

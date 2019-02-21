import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginService.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.loginService.redirectUrl = state.url;
          this.navigationService.navigateByUrl(RouteName.Login);
        }
      }),
    );
  }
}

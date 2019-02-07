import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    }

    this.loginService.redirectUrl = state.url;
    this.navigationService.navigateByUrl(RouteName.Login);
    return false;
  }
}

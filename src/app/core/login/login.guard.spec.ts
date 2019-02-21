import { LoginGuard } from './login.guard';
import { LoginService } from './login.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouteName } from '@shared/route-name';
import { of, Observable } from 'rxjs';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let loginService: {
    isLoggedIn$: Observable<boolean>,
    redirectUrl: string,
  };
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    loginService = jasmine.createSpyObj('LoginService', ['isLoggedIn']);
    navigationService = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);

    guard = new LoginGuard(loginService as any, navigationService);
  });

  describe('#canActivate', () => {
    describe('for logged in user', () => {
      it('should be truthy', () => {
        loginService.isLoggedIn$ = of(true);
        expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot))
          .toBeTruthy();
      });
    });

    describe('for not logged in user', () => {
      beforeEach(() => {
        loginService.isLoggedIn$ = of(false);
      });

      it('should be falsy', () => {
        expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot))
          .toBeFalsy();
      });

      it('should save redirectUrl', () => {
        const url = 'url';
        guard.canActivate({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot);
        expect(loginService.redirectUrl).toBe(url);
      });

      it('should navigate to Login page', () => {
        expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
        expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Login);
      });
    });
  });
});

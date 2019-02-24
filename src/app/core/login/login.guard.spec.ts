import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { LoginGuard } from './login.guard';
import { doesNotThrow } from 'assert';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let loginService: {
    isLoggedIn$: Observable<boolean>,
    redirectUrl?: string,
  };
  let isLoggedIn$: BehaviorSubject<boolean>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    loginService = { isLoggedIn$: isLoggedIn$ = new BehaviorSubject(false) };
    navigationService = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);

    guard = new LoginGuard(loginService as any, navigationService);
  });

  describe('#canActivate', () => {
    describe('for logged in user', () => {
      it('should be truthy', () => {
        expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot))
          .toBeTruthy();
      });
    });

    describe('for not logged in user', () => {
      beforeEach(() => {
        isLoggedIn$.next(false);
      });

      it('should be falsy', (done) => {
        guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
          .subscribe((result) => {
            expect(result).toBeFalsy();
            done();
          });
      });

      it('should save redirectUrl', (done) => {
        const url = 'url';
        guard.canActivate({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot)
          .subscribe(() => {
            expect(loginService.redirectUrl).toBe(url);
            done();
          });
      });

      it('should navigate to Login page', (done) => {
        guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
          .subscribe(() => {
            expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Login);
            done();
          });
      });
    });
  });
});

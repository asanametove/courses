import { of } from 'rxjs';
import { NavigationService } from '@core/navigation/navigation.service';
import { LoginService } from './login.service';
import { RouteName } from '@shared/route-name';
import { login } from '@shared/api';
import { LocalStorageKey } from '@shared/local-storage-keys';

describe('LoginService', () => {
  let service: LoginService;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let http: {
    post: jasmine.Spy,
  };

  beforeEach(() => {
    navigationService = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);
    http = jasmine.createSpyObj('Http', ['post']);
    service = new LoginService(navigationService, http as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#logIn', () => {
    const username = 'username';
    const password = 'password';
    const token = 'token';

    beforeEach(() => {
      spyOn(localStorage, 'setItem');
      http.post.and.returnValue(of({ token }));
    });

    it('should make login call', () => {
      service.logIn(username, password);

      expect(http.post).toHaveBeenCalledWith(
        login,
        {login: username, password},
      );
    });

    it('should place user info to the local storage', () => {
      service.logIn(username, password);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        LocalStorageKey.Token,
        token,
      );
    });

    // TODO cover user info updating
    it('should update user info', () => {
    });

    it('should navigate to redirectUrl if it exists', () => {
      const url = service.redirectUrl = 'url';
      service.logIn(username, password);
      expect(navigationService.navigateByUrl).toHaveBeenCalledWith(url);
    });

    it('should reset redirectUrl', () => {
      service.redirectUrl = 'url';
      service.logIn(username, password);
      expect(service.redirectUrl).toBeNull();
    });
  });

  describe('#logOut', () => {
    it('should remove user info from local storage', () => {
      spyOn(localStorage, 'removeItem');
      service.logOut();
      expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKey.Token);
    });

    it('should navigate to login page', () => {
      service.logOut();
      expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Login);
    });
  });

  describe('#isLoggedIn', () => {
    it('should be true if there is user info in local storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('info');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should be false if there is no user info in local storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.isLoggedIn()).toBe(false);
    });
  });
});

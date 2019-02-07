import { NavigationService } from '@core/navigation/navigation.service';
import { LoginService } from './login.service';
import { RouteName } from '@shared/route-name';

describe('LoginService', () => {
  let service: LoginService;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    navigationService = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);
    service = new LoginService(navigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#logIn', () => {
    const username = 'username';
    const password = 'password';

    it('should place user info to the local storage', () => {
      spyOn(localStorage, 'setItem');
      service.logIn(username, password);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'userInfo',
        jasmine.any(String),
      );
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
      expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
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

  describe('#getUserInfo', () => {
    it('should return parsed user info', () => {
      spyOn(localStorage, 'getItem').and.returnValue('{"username": "username"}');
      expect(service.getUserInfo()).toEqual({ username: 'username' });
    });
  });
});

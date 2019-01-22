import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    service = new LoginService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#logIn', () => {
    it('should place user info to the local storage', () => {
      const username = 'username';
      const password = 'password';
      spyOn(localStorage, 'setItem');

      service.logIn(username, password);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'userInfo',
        jasmine.any(String),
      );
    });
  });

  describe('#logOut', () => {
    it('should remove user info from local storage', () => {
      spyOn(localStorage, 'removeItem');
      service.logOut();
      expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
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

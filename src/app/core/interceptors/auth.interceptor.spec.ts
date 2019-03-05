import { HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    interceptor = new AuthInterceptor();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('#intercept', () => {
    let handle: jasmine.Spy;
    let originalReq: HttpRequest<any>;
    const authorization = 'Authorization';

    beforeEach(() => {
      handle = jasmine.createSpy('next#handle');
      originalReq = new HttpRequest('GET', null);
    });

    it('should add authorization token to request headers', () => {
      const token = 'token';
      spyOn(localStorage, 'getItem').and.returnValue(token);
      interceptor.intercept(originalReq, { handle });
      const req = handle.calls.mostRecent().args[0] as HttpRequest<any>;
      expect(req.headers.get(authorization)).toBe(token);
      expect(originalReq).not.toBe(req);
    });

    it('should not add authorization token if it does not exist', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      interceptor.intercept(originalReq, { handle });
      const req = handle.calls.mostRecent().args[0] as HttpRequest<any>;
      expect(req.headers.get(authorization)).toBeNull();
      expect(originalReq).toBe(req);
    });
  });

});


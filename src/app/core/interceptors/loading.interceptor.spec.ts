import { fakeAsync, tick } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;
  let loadingService: {
    show: jasmine.Spy,
    hide: jasmine.Spy,
  };

  beforeEach(() => {
    loadingService = {
      show: jasmine.createSpy('loadingService#show'),
      hide: jasmine.createSpy('loadingService#hide'),
    };
    interceptor = new LoadingInterceptor(loadingService as any);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('#intercept', () => {
    let next: {
      handle: jasmine.Spy,
    };
    let handle$: BehaviorSubject<any>;
    let req: HttpRequest<any>;
    const authorization = 'Authorization';

    beforeEach(() => {
      handle$ = new BehaviorSubject(null);
      next = {
        handle: jasmine.createSpy('next#handle').and.returnValue(handle$),
      };
      req = new HttpRequest('GET', null);
    });

    it('should show spinner on request start', (done) => {
      interceptor.intercept(req, next).subscribe(() => {
        expect(loadingService.show).toHaveBeenCalled();
        expect(loadingService.hide).not.toHaveBeenCalled();
        done();
      });
    });

    it('should hide spinner on request complete', fakeAsync(() => {
      interceptor.intercept(req, next).subscribe();
      handle$.complete();
      tick(1000);
      expect(loadingService.show).toHaveBeenCalledBefore(loadingService.hide);
    }));

    it('should hide spinner on request error', fakeAsync(() => {
      interceptor.intercept(req, next).subscribe();
      handle$.error(null);
      tick(1000);
      expect(loadingService.show).toHaveBeenCalledBefore(loadingService.hide);
    }));
  });

});


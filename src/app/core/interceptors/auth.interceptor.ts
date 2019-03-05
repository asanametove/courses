import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKey } from '@shared/local-storage-keys';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(LocalStorageKey.Token);

    if (token) {
      req = req.clone({
        headers: req.headers.append('Authorization', token),
      });
    }

    return next.handle(req);
  }

}

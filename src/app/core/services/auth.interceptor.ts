import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });

    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 200:
            console.log('Authorized Request');
            break;
          case 401:
            this.authService.logout();
            break;
        }

        const error = err.error?.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

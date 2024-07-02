import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoggerService } from './logger.service';
import { GLBOAL } from '../../global';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  toastKey: string = 'globalMessage';

  constructor(
    private loggerService: LoggerService,
    private messageService: MessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (GLBOAL.IS_DEBUG) this.loggerService.info(`API Call ==> ${req.url}`);

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }

          this.messageService.add({ key: this.toastKey, severity: 'info', summary: "We're sorry.", detail: error.error.message ?? error.error.error.title });
          this.loggerService.error(error.message);

          return throwError({ error: { message: error.message ?? error.error.error.title } });
        } else {
          if (error !== 'OK') {
            this.loggerService.error(error);

            if (error instanceof Object) {
              this.messageService.add({ key: this.toastKey, severity: 'info', summary: "We're sorry", detail: JSON.stringify(error) });
            }
            else this.messageService.add({ key: this.toastKey, severity: 'info', summary: "We're sorry", detail: error ?? error.message });
          }
          return throwError('ok')
        }
      })
    );
  }
}

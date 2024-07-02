import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { EncryptService } from '../../shared/services/encrypt.service';
import { Observable } from 'rxjs';
import { GLBOAL } from '../../../global';

@Injectable()
export class EncryptAuthInterceptor implements HttpInterceptor {
  constructor(private encryptService: EncryptService,) { }
  // If you want to some exclude api call from Encryption then add here like that.
  // environment.basUrl is your API URL
  ExcludeURLList = [
    GLBOAL.BASE_API_V1_URL + "/auth/status",
    "https://api.ipify.org/?format=json"
  ];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let exludeFound = this.ExcludeURLList.filter(element => {
      return req.url.includes(element)
    });
    // We have Encrypt the GET and POST call before pass payload to API
    if (!(exludeFound && exludeFound.length > 0)) {
      if (req.method == "GET" || req.method=="DELETE") {
        if (req.url.indexOf("?") > 0) {
          let encriptURL = req.url.substring(0, req.url.indexOf("?") + 1) + this.encryptService.encryptAES_Utf8(req.url.substring(req.url.indexOf("?") + 1, req.url.length));
          const cloneReq = req.clone({
            url: encriptURL
          });
          return next.handle(cloneReq);
        }
        return next.handle(req);
      } else if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
        if (req.body) {
          if (req.body.length > 0) {
           
            if (req.url.indexOf("?") > 0) {
              let encriptURL = req.url.substring(0, req.url.indexOf("?") + 1) + this.encryptService.encryptAES_Utf8(req.url.substring(req.url.indexOf("?") + 1, req.url.length));
              const cloneReq = req.clone({
                body: this.encryptService.encryptAES_Utf8(req.body),
                url: encriptURL
              });
              return next.handle(cloneReq);
            }

            const cloneReq = req.clone({
              body: this.encryptService.encryptAES_Utf8(req.body),
              setHeaders: {
                'Content-Type': 'application/json',
              },
            });

            return next.handle(cloneReq);
          }
        }
        //let data = req.body as FormData;
        return next.handle(req);
      }
    }
    return next.handle(req);
  }
}

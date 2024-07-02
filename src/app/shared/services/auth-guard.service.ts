import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Scroll, UrlTree } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { MessageService } from 'primeng/api';
import { NAVIGATION_MENU } from '../../core/models/menu';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private sharedService: SharedService,
    private loggerSerivce: LoggerService,
    private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    else {
      if (!this.checkAuthorizedRoute(state.url)) {
        this.router.navigate(['auth/access-denied']);
        this.messageService.add({ key: 'globalMessage', severity: 'info', summary: "Access deined.", detail: "You don't have permission." });
      }
    }
    return true;
  }

  checkAuthorizedRoute(url: string): boolean {
    let userrole = this.sharedService.getUserRole();
    let isValid: boolean = true;
    NAVIGATION_MENU.forEach((v, i) => {
      v.items.forEach((v1: any, i1: any) => {
        if (v1.items !== undefined) {
          v1.items.forEach((v2: any, i2: any) => {
            if (v2.routerLink !== undefined) {
              if (v2.routerLink[0] === url) {
                isValid = v2.data.role.includes(userrole);
              }
            }
          });
        }
        else {
          if (v1.routerLink !== undefined) {
            if (v1.routerLink[0] === url) {
              isValid = v1.data.role.includes(userrole);;
            }
          }
        }
      });
    });

    return isValid;
  }
}

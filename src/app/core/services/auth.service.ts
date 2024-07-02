import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';
import { Observable } from 'rxjs';
import { RootModel } from '@core_models/root-model';
import { GLBOAL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private logger: LoggerService) {

  }

  getUser(phone: string): Observable<RootModel> {
    let url: string = `${GLBOAL.BASE_API_V1_URL}/auth/get-user?phone=${phone}`;
    return this.http.get<RootModel>(url);
  }

  status(): Observable<RootModel> {
    let url: string = `${GLBOAL.BASE_API_V1_URL}/auth/status`;
    return this.http.get<RootModel>(url);
  }

  accessToken(username: string, password: string, device: string): Observable<RootModel> {
    let url: string = `${GLBOAL.BASE_API_V1_URL}/auth/access-token`;

    const body = {
      username: username,
      password: password,
      device: device
    }
    return this.http.post<RootModel>(url, JSON.stringify(body));
  }

  refreshToken(device: string): Observable<RootModel> {
    let url: string = `${GLBOAL.BASE_API_V1_URL}/auth/refresh-token`;
    const body = {
      access_token: window.localStorage.getItem('access_token'),
      refresh_token: window.localStorage.getItem('refresh_token'),
      device: device
    }
    return this.http.post<RootModel>(url, JSON.stringify(body));
  }

  isHasToken(): boolean {
    return (
      window.localStorage.getItem('refresh_token') !== undefined &&
      window.localStorage.getItem('refresh_token') !== null &&
      window.localStorage.getItem('refresh_token') !== '')
  }

  isLoggedIn(): boolean {
    return (
      window.sessionStorage.getItem('authorized_status') !== undefined &&
      window.sessionStorage.getItem('authorized_status') !== null &&
      window.sessionStorage.getItem('authorized_status') !== '')
  }

  logout(): void {
    window.sessionStorage.setItem('authorized_status', '');
  }

  logoutForce(): void {
    window.sessionStorage.setItem('authorized_status', '');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('userrole');
    window.sessionStorage.removeItem('userId');

    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');

    window.localStorage.removeItem('default_company');
    window.localStorage.removeItem('default_branch');
  }
}

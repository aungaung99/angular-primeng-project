import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivityChangesModel } from '@core_models/report/activity/activitychanges.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  //#region Default Company

  setDefaultCompany(value: string): void {
    localStorage.setItem('default_company', value);
  }

  getDefaultCompany(): string | null {
    return localStorage.getItem('default_company');
  }

  //#endregion

  //#region Default Branch

  setDefaultBranch(value: string): void {
    localStorage.setItem('default_branch', value);
  }

  getDefaultBranch(): string | null {
    return localStorage.getItem('default_branch');
  }

  //#endregion

  //#region Permission

  setPermission(value: string): void {
    localStorage.setItem('permissions', value);
  }

  getPermission(): string | null {
    return localStorage.getItem('permissions');
  }

  //#endregion

  //#region UserId

  setUserId(value: string): void {
    sessionStorage.setItem('userId', value);
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  //#endregion

  //#region UserName

  setUserName(value: string): void {
    sessionStorage.setItem('username', value);
  }

  getUserName(): string | null {
    return sessionStorage.getItem('username');
  }

  //#endregion

  //#region UserRole

  setUserRole(value: string): void {
    sessionStorage.setItem('userrole', value);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userrole');
  }

  //#endregion

  //#region Notification Token

  setNotificationToken(value: string): void {
    localStorage.setItem('notification_token', value);
  }

  getNotificationToken(): string | null {
    return localStorage.getItem('notification_token');
  }

  //#endregion

  //#region Activtiy Changes

  getActvityChangesWithPksCompare(result: any[], pksJoinedComman: string): any[] {
    let returnResult: any[] = [];

    result.forEach((v) => {
      // Extract the substring between the first '{' and '}' characters
      const first_index = v.changes.indexOf("{");
      const last_index = v.changes.indexOf("}");
      const data = v.changes.substring(first_index + 1, last_index);
      const pks: any[] = data.split(',');

      let comparePks: any[] = [];
      pks.forEach((v: string, i) => {
        var id: any = v.split(':')[1].trim() as any;
        comparePks.push(id);
      });

      if (pksJoinedComman === comparePks.join(',')) {
        //	isSameAsCurrent	false	boolean
        const activity: ActivityChangesModel = {
          id: v.id,
          title: v.title,
          changes: v.changes,
          changesOn: v.changesOn,
          changesBy: v.changesBy,
          changesState: v.changesState
        };

        // Add the activity object to the list
        returnResult.push(activity);
      }
    });

    return returnResult;
  }

  //#endregion

  getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  convertBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      result.next((event?.target?.result ?? "").toString().split(',')[1]);
    };
    return result;
  }
}

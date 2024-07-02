import { Component, EventEmitter, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoggerService } from '../../services/logger.service';
import { NotificationDbModel } from '../../../core/models/notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrl: './notification-panel.component.scss'
})
export class NotificationPanelComponent {
  @Output() notiRead = new EventEmitter<void>();
  @Output() redirectUrlClick = new EventEmitter<void>();
  @Input('currentDate') currentDate!: Date;
  notifications: NotificationDbModel[] = [];
  constructor(
    private dbService: NgxIndexedDBService,
    private router: Router,
    private loggerService: LoggerService) { }

  loadData(): NotificationDbModel[] | any {
    this.dbService.getAll('notification-store').subscribe((res) => {
      this.notifications = res as NotificationDbModel[];
      this.notifications.sort((a, b) => b.id - a.id);
      return this.notifications as NotificationDbModel[];
    });
  }

  onRead(value: NotificationDbModel): void {
    if (!value.read) {
      value.read = true;
      this.dbService.update('notification-store', value).subscribe((res) => {
        this.loadData();
      });
    }

    if (value.redirectUrl !== null || value.redirectUrl !== undefined) {
      this.redirectUrlClick.emit();
      this.router.navigateByUrl(value.redirectUrl);
    }

    this.notiRead.emit();
  }

  getDiffDate(sdate: any, edate: any): any {
    //return Math.ceil(Math.abs(sdate - edate) / (1000 * 60 * 60 * 24));
    let timestamp = Math.abs(sdate - edate);
    if (Math.round(timestamp / (1000 * 60 * 60 * 24)) > 0) {
      return Math.round(timestamp / (1000 * 60 * 60 * 24)) + ' days ago';
    }
    else if (Math.round(timestamp / (1000 * 60 * 60)) > 0) {
      return Math.round(timestamp / (1000 * 60 * 60)) + ' hours ago';
    }
    else if (Math.round(timestamp / (1000 * 60)) > 0) {
      return Math.round(timestamp / (1000 * 60)) + ' minutes ago';
    }
    else {
      return Math.round(timestamp / (1000)) + ' seconds ago';
    }

  }
}

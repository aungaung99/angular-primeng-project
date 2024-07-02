import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
// import { NotificationPanelComponent } from '../shared/components/notification-panel/notification-panel.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NotificationDbModel } from '@core_models/notification.model';
// import { getMessaging, onMessage } from "firebase/messaging";
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrl: './app.topbar.component.scss'
})
export class AppTopBarComponent implements OnInit {
  @Output() searchClick = new EventEmitter<void>();

  currentDate: Date = new Date();
  notiPanelVisible: boolean = false;
  notiUnreadCount!: string;
  items!: MenuItem[];

  //#region User Info

  fullName!: string;
  roleName!: string;

  //#endregion
  // @ViewChild('notificationPanel') notificationPanel!: NotificationPanelComponent

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    private messageService: MessageService,
    private dbService: NgxIndexedDBService,
    public layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit(): void {
    // this.listen();
    this.getNotiCount();

    this.fullName = this.sharedService.getUserName() ?? "";
    this.roleName = this.sharedService.getUserRole() ?? "";

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Setting',
            icon: 'pi pi-cog',
            routerLink: ['./setting']
          },
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
          }
        ]
      }
    ];
  }

  menuClick(label: string): void {
    if (label === 'Logout') {
      this.onLogout();
    }
  }

  getNotiCount(): void {
    this.dbService.getAll('notification-store').subscribe((res) => {
      let list = res as NotificationDbModel[];
      this.notiUnreadCount = list.filter(x => x.read == false).length.toString();
    });
  }

  redirectRoute(): void {
    this.notiPanelVisible = false;
  }

  onSearch(): void {
    this.searchClick.emit();
  }

  onNotification(): void {
    this.currentDate = new Date();
    // this.notificationPanel.loadData();
    this.notiPanelVisible = true;
  }

  onLogout(): void {
    this.confirmationService.confirm({
      message: 'Do you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.authService.logoutForce();
        this.router.navigate(['./auth/login']);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            // NO CODE
            break;
          case ConfirmEventType.CANCEL:
            // NO CODE
            break;
        }
      },
      key: 'logoutDialog'
    });
  }

  // listen() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload: any) => {
  //     console.log('Message received. ', payload);
  //     const noti = payload.notification;
  //     const data = payload.data;
  //     if (data.type == 'notification') {
  //       // Inserting IndexedDb Item
  //       var db_item = {
  //         date: new Date(),
  //         title: noti.title,
  //         body: noti.body,
  //         redirectUrl: data.redirectUrl,
  //         role: data.role,
  //         jsonData: data.jsonData,
  //         read: false
  //       };

  //       this.dbService.add('notification-store', db_item).subscribe(() => {
  //         this.getNotiCount();
  //       });

  //       this.messageService.add({ key: 'globalMessage', severity: 'info', summary: noti.title, detail: noti.body, closable: true });
  //     }
  //   });
  // }
}

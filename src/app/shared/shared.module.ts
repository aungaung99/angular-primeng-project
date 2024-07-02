import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// PrimeNg
import { SidebarModule } from 'primeng/sidebar';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollerModule } from 'primeng/scroller';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

// Components
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { LazyProgressBarComponent } from './components/lazy-progress-bar/lazy-progress-bar.component';

// Services
import { EncryptService } from '@shared_services/encrypt.service';
import { LoggerService } from '@shared_services/logger.service';
import { AuthGuardService } from '@shared_services/auth-guard.service';
import { SharedService } from '@shared_services/shared.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandlerInterceptor } from '@shared_services/http-error-handler.interceptor';



@NgModule({
  declarations: [
    BreadCrumbComponent,
    NotificationPanelComponent,
    LazyProgressBarComponent
  ],
  imports: [
    CommonModule,

    // PrimeNg
    BreadcrumbModule,
    ProgressBarModule,
    SidebarModule,
    DialogModule,
    InputTextModule,
    ScrollPanelModule,
    ScrollerModule,
    AvatarModule,
    ChipModule,
    DividerModule,
    TagModule
  ],
  providers:[
    EncryptService,
    LoggerService,
    // ExportService,
    AuthGuardService,
    SharedService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    },
  ],
  exports:[
    BreadCrumbComponent,
    NotificationPanelComponent,
    LazyProgressBarComponent
  ]
})
export class SharedModule { }

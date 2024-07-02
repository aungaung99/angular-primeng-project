import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Indexed Db
import { DBConfig, NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppLayoutModule } from './layout/app.layout.module';

// PrimeNg
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const dbConfig: DBConfig = {
  name: 'notification-database',
  version: 1,
  objectStoresMeta: [{
    store: 'notification-store',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      { name: 'date', keypath: 'date', options: { unique: false } },
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'body', keypath: 'body', options: { unique: false } },
      { name: 'role', keypath: 'role', options: { unique: false } },
      { name: 'jsonData', keypath: 'jsonData', options: { unique: false } },
      { name: 'redirectUrl', keypath: 'redirectUrl', options: { unique: false } },
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    CoreModule,
    SharedModule,
    ToastModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    provideClientHydration(),
    MessageService, 
    NgxIndexedDBService, 
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

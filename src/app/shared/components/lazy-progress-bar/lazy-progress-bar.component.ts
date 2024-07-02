import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-lazy-progress-bar',
  templateUrl: './lazy-progress-bar.component.html',
  styleUrl: './lazy-progress-bar.component.scss'
})
export class LazyProgressBarComponent implements OnInit {
  loading: boolean = true;
  hidden: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router) {
    this._router.events.subscribe((event) => {
      this.navigationInterceptor(event)
    });
  }
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.hidden = true;
    }
  }

  private navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false;
      }, 800);
    }
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loading = false;
      }, 800);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.loading = false;
      }, 800);
    }
  }
}

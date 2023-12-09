import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';

import { PageLayoutComponent } from './ui/layouts/page-layout/page-layout.component';

import { HEADERS_URL_MAP } from './const';
import { RoutesEnum } from './routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PageLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public currentHeader: WritableSignal<string> = signal('header-pierogator');
  
  public headerPath: Signal<string> = computed(() => `assets/headers/${this.currentHeader()}.svg`)  

  private _routeChange$ = inject(Router).events.pipe((takeUntilDestroyed()))

  public ngOnInit(): void {
    this._handleNavigationChange();
  }

  private _handleNavigationChange(): void {
    this._routeChange$.subscribe((routeChange: Event) => {
      if(routeChange instanceof NavigationEnd) {
        const updatedHeader = HEADERS_URL_MAP.get(routeChange.url.slice(1) as unknown as RoutesEnum);
        
        if(updatedHeader) this.currentHeader.set(updatedHeader)
      }
    })
  }
}

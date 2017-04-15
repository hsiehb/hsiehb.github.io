/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

import { NavGuard } from './core/services/nav-guard/nav-guard.service';

import { HttpInterceptor } from './core/services/interceptor/interceptor.service';

import 'rxjs/Rx';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
      './core/styles/classes.scss',
      './core/styles/typography.scss',
      './app.component.scss'
  ],
  templateUrl: './app.component.pug',
  providers: [
      NavGuard,
      HttpInterceptor
  ]
})
export class AppComponent {

    constructor(
    public appState: AppState) {
  }

}

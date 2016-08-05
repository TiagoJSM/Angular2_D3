import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import './rxjs-extensions';

@Component({
  selector: 'my-app',
  template: `
     <h1>{{title}}</h1>
	<nav>
    <a [routerLink]="['/bar-chart']" routerLinkActive="active">Bar Chart</a>
    <a [routerLink]="['/circles']" routerLinkActive="active">Circles</a>
    <a [routerLink]="['/pie-chart']" routerLinkActive="active">Pie Chart</a>
    <a [routerLink]="['/stacked-chart']" routerLinkActive="active">Stack Chart</a>
	</nav>
	<router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: []
})
export class AppComponent {
  title = 'D3 charts';
}
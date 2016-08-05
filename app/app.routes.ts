import { provideRouter, RouterConfig }  from '@angular/router';

import { BarChartComponent } from './components/barChart/bar-chart.component'
import { CirclesComponent } from './components/circles/circles.component'

const routes: RouterConfig = [
	{
		path: '',
		redirectTo: '/bar-chart',
		pathMatch: 'full'
	},
	{
		path: 'bar-chart',
		component: BarChartComponent
	},
	{
		path: 'circles',
		component: CirclesComponent
	},
];

export const appRouterProviders = [
  provideRouter(routes)
];
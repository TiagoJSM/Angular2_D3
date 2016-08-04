import { provideRouter, RouterConfig }  from '@angular/router';

import { BarChartComponent } from './components/barChart/bar-chart.component'

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
];

export const appRouterProviders = [
  provideRouter(routes)
];
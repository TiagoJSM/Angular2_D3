import { provideRouter, RouterConfig }  from '@angular/router';

import { BarChartComponent } from './components/barChart/bar-chart.component'
import { CirclesComponent } from './components/circles/circles.component'
import { PieChartComponent } from './components/pieChart/pie-chart.component'

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
	{
		path: 'pie-chart',
		component: PieChartComponent
	},
];

export const appRouterProviders = [
  provideRouter(routes)
];
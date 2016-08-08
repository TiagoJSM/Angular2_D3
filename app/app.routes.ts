import { provideRouter, RouterConfig }  from '@angular/router';

import { BarChartComponent } from './components/barChart/bar-chart.component'
import { CirclesComponent } from './components/circles/circles.component'
import { PieChartComponent } from './components/pieChart/pie-chart.component'
import { StackedChartComponent } from './components/stackedChart/stacked-chart.component'
import { StackedAreaChartComponent } from './components/stackedAreaChart/stacked-area-chart.component'

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
	{
		path: 'stacked-chart',
		component: StackedChartComponent
	},
	{
		path: 'stacked-area-chart',
		component: StackedAreaChartComponent
	},
];

export const appRouterProviders = [
  provideRouter(routes)
];
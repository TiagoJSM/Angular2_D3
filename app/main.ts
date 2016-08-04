import 'rxjs/add/operator/toPromise';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
	appRouterProviders
	])
	.catch(err => console.error(err));;
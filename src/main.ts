/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ProdottiComponent } from './app/prodotti/prodotti.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

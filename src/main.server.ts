import { enableProdMode } from '@angular/core';
import { AppServerModule } from './app/app.server.module';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

// Simply export the AppServerModule (Angular Universal handles bootstrapping)
export { AppServerModule };

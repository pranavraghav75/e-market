import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const appConfig = { 
  ...config, 
  providers: (config as { providers?: any[] }).providers ?? [] 
};

const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

export default bootstrap;

// src/main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }               from '@angular/platform-browser';
import { AppComponent }                       from './app/app.component';
import { AppRoutingModule }                   from './app/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule }                           from '@auth0/angular-jwt';
import { JwtInterceptor }                      from './app/core/interceptors/jwt.interceptor';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { environment }                         from './environments/environment';

export function tokenGetter() {
  const u = localStorage.getItem('currentUser');
  return u ? JSON.parse(u).token : null;
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter,
          allowedDomains: ['localhost:5001'],
          disallowedRoutes: [
            'localhost:5001/api/auth/login',
            'localhost:5001/api/auth/register'
          ]
        }
      }),
      AppRoutingModule
    ),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
}).catch(err => console.error(err));
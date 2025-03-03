import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ConfigService } from './services/config.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    ConfigService,
    GoogleAnalyticsService
  ]
};

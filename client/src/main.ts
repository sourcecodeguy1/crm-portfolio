import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { GoogleAnalyticsService } from './app/services/google-analytics.service';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(
      withInterceptors([AuthInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      })
    ),
  ],
})
  .then(appRef => {
    // Get Google Analytics service from the injector after bootstrap
    const gaService = appRef.injector.get(GoogleAnalyticsService);

    // Initialize Google Analytics
    setTimeout(() => {
      gaService.initialize();
    }, 1000); // Small delay to ensure everything is loaded
  })
  .catch(err => {
    // Keep only critical error logging
    console.error('Application failed to start');
  });

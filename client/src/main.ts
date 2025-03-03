import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { GoogleAnalyticsService } from './app/services/google-analytics.service';

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    // Get Google Analytics service from the injector after bootstrap
    const gaService = appRef.injector.get(GoogleAnalyticsService);

    // Initialize Google Analytics
    setTimeout(() => {
      gaService.initialize();
    }, 1000); // Small delay to ensure everything is loaded
  })
  .catch(err => console.error('Bootstrap error:', err));

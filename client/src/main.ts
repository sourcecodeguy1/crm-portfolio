import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { effect, inject } from '@angular/core';
import { ConfigService } from './app/services/config.service';

// Declare dataLayer on the Window interface
declare global {
  interface Window {
    dataLayer: any[];
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

function setupGoogleAnalytics() {
  const configService = inject(ConfigService);

  effect(() => {
    const config = configService.getConfig();
    if (config.googleAnalyticsId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any) {
        window.dataLayer.push(args);
      }

      gtag('js', new Date());
      gtag('config', config.googleAnalyticsId);
    } else {
      console.warn('Google Analytics ID not found in configuration');
    }
  });
}

// Call the function to set up Google Analytics
setupGoogleAnalytics();

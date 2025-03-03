import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Declare dataLayer on the Window interface
declare global {
  interface Window {
    dataLayer: any[];
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

function loadGoogleAnalytics() {
  if (environment.googleAnalyticsId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any) {
      window.dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', environment.googleAnalyticsId);
  } else {
    console.warn('Google Analytics ID not found in environment.prod.ts');
  }
}

// Call the function on app startup
loadGoogleAnalytics();

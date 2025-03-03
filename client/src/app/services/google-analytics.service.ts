import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private initialized = false;

  constructor(private configService: ConfigService) {}

  initialize(): void {
    if (this.initialized) return;

    console.log('Initializing Google Analytics service...');
    const config = this.configService.getConfig();
    console.log('Config loaded for GA:', config);

    if (config.googleAnalyticsId) {
      console.log('GA ID found:', config.googleAnalyticsId);
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;

      script.onload = () => console.log('GA script loaded successfully');
      script.onerror = (e) => console.error('GA script failed to load:', e);

      document.head.appendChild(script);
      console.log('GA script tag added to head');

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: any) {
        console.log('gtag called with:', args);
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', config.googleAnalyticsId);
      console.log('GA configuration complete');

      this.initialized = true;
    } else {
      console.warn('Google Analytics ID not found in configuration');
    }
  }
}

// Add gtag to Window interface
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

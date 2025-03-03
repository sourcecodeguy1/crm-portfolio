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

    const config = this.configService.getConfig();

    if (config.googleAnalyticsId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;

      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: any) {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', config.googleAnalyticsId);

      this.initialized = true;
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

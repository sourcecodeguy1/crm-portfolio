import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EnvironmentModel } from '../interfaces/environment.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configSignal = signal<EnvironmentModel>({
    production: true,
    apiUrl: '',
    googleAnalyticsId: ''
  });

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  // Method to explicitly load the configuration
  loadConfig(): void {
    console.log('ConfigService: Loading configuration...');

    // Use responseType: 'text' to get the raw response
    this.http.get('./assets/config.json', { responseType: 'text' })
      .pipe(
        tap(rawText => {
          try {
            // Parse the text manually
            console.log('Raw config response:', rawText);
            const config = JSON.parse(rawText) as EnvironmentModel;
            console.log('ConfigService: Configuration loaded successfully:', config);
            this.configSignal.set(config);
          } catch (parseError) {
            console.error('ConfigService: JSON parse error:', parseError);
          }
        }),
        catchError(error => {
          console.error('ConfigService: HTTP error loading configuration:', error);
          return of(''); // Return empty string on error
        })
      )
      .subscribe();
  }

  getConfig(): EnvironmentModel {
    return this.configSignal();
  }
}

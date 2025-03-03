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
    // Use responseType: 'text' to get the raw response
    this.http.get('./assets/config.json', { responseType: 'text' })
      .pipe(
        tap(rawText => {
          try {
            const config = JSON.parse(rawText) as EnvironmentModel;
            this.configSignal.set(config);
          } catch (parseError) {
            // Silent error in production
          }
        }),
        catchError(error => {
          // Silent error in production
          return of('');
        })
      )
      .subscribe();
  }

  getConfig(): EnvironmentModel {
    return this.configSignal();
  }
}

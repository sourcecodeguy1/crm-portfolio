import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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

  private configLoaded = false;

  constructor(private http: HttpClient) {}

  // Load config and return a Promise (for APP_INITIALIZER)
  loadConfig(): Promise<void> {
    return firstValueFrom(
      this.http.get('./assets/config.json', { responseType: 'text' })
    )
      .then(rawText => {
        try {
          const config = JSON.parse(rawText) as EnvironmentModel;
          this.configSignal.set(config);
          this.configLoaded = true;
        } catch (parseError) {
          console.error('Failed to parse config.json:', parseError);
        }
      })
      .catch(error => {
        console.error('Failed to load config.json:', error);
      });
  }

  getConfig(): EnvironmentModel {
    return this.configSignal();
  }

  isLoaded(): boolean {
    return this.configLoaded;
  }
}

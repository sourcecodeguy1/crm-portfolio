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

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  async loadConfig(): Promise<void> {
    console.log('ConfigService: Loading configuration...');
    try {
      const config = await firstValueFrom(
        this.http.get<EnvironmentModel>('./assets/config.json')
      );
      console.log('ConfigService: Configuration loaded successfully:', config);
      this.configSignal.set(config);
    } catch (error) {
      console.error('ConfigService: Failed to load configuration:', error);
    }
  }


  getConfig(): EnvironmentModel {
    return this.configSignal();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

export interface ActivityLogEntry {
  id: number;
  type: string;
  description: string;
  subject_type: string | null;
  subject_id: number | null;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  get apiUrl() {
    return this.configService.getConfig().apiUrl + '/activity-log';
  }

  getRecentActivity(): Observable<ActivityLogEntry[]> {
    return this.http.get<ActivityLogEntry[]>(this.apiUrl, { withCredentials: true });
  }
}

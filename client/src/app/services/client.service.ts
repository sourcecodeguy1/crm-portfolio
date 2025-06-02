import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Client } from '../interfaces/client.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  get apiUrl() {
    return this.configService.getConfig().apiUrl + '/clients';
  }

  // Get all clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl, { withCredentials: true });
  }

  // Get the total client count
  getClientCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`, { withCredentials: true })
      .pipe(map((response) => response.count));
  }

  // Delete a client by ID
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

}

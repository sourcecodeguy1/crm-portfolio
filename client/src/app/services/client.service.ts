import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Client } from '../interfaces/client.interface';
import { ClientDetail } from '../interfaces/client-detail.interface';
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
  getClientCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`, { withCredentials: true });
  }

  // Get a single client with their invoices
  getClient(id: number): Observable<ClientDetail> {
    return this.http.get<ClientDetail>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Create a new client
  createClient(client: Partial<Client>): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, { withCredentials: true });
  }

  // Update a client
  updateClient(id: number, client: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client, { withCredentials: true });
  }

  // Delete a client by ID
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

}

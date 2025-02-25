import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = '/api/clients';

  constructor(private http: HttpClient) { }

  // Get all clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Get the total client count
  getClientCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`)
      .pipe(map((response) => response.count));
  }

  // Delete a client by ID
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

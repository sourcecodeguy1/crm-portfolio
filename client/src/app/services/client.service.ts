import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClientCount(): Observable<number> {
    return this.http.get<{count: number}>('/api/clients/count')
      .pipe(map((response: { count: any; }) => response.count));
  }

}

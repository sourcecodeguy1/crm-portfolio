import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = '/api/invoices';

  constructor(private http: HttpClient) {}

  getInvoiceCount(): Observable<number> {
    return this.http.get<{count: number}>(`${this.apiUrl}/count`)
      .pipe(map(response => response.count));
  }

  getPendingInvoiceCount(): Observable<number> {
    return this.http.get<{count: number}>(`${this.apiUrl}/pending`)
      .pipe(map(response => response.count));
  }

  getTotalRevenue(): Observable<number> {
    return this.http.get<{total_revenue: string}>(`${this.apiUrl}/total-revenue`)
      .pipe(map(response => parseFloat(response.total_revenue)));
  }

  getInvoiceStatusBreakdown(): Observable<{ paid: number, pending: number, overdue: number }> {
    return this.http.get<{ paid: number, pending: number, overdue: number }>(`${this.apiUrl}/status-breakdown`);
  }

  getRevenueOverTime(): Observable<{ dates: string[], revenue: number[] }> {
    return this.http.get<{ dates: string[], revenue: number[] }>(`${this.apiUrl}/revenue-over-time`);
  }
}

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import {PaginatedResponse} from '../interfaces/paginated-response.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  get apiUrl() {
    return this.configService.getConfig().apiUrl + '/invoices';
  }

  // Get all invoices
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl, { withCredentials: true });
  }

  // Get total invoice count
  getInvoiceCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`, { withCredentials: true })
      .pipe(map(response => response.count));
  }

  // Get pending invoices count
  getPendingInvoiceCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/pending`, { withCredentials: true })
      .pipe(map(response => response.count));
  }

  // Get total revenue
  getTotalRevenue(): Observable<number> {
    return this.http.get<{ total_revenue: string }>(`${this.apiUrl}/total-revenue`, { withCredentials: true })
      .pipe(map(response => parseFloat(response.total_revenue)));
  }

  // Get invoice status breakdown
  getInvoiceStatusBreakdown(): Observable<{ paid: number, pending: number, overdue: number }> {
    return this.http.get<{ paid: number, pending: number, overdue: number }>(`${this.apiUrl}/status-breakdown`, { withCredentials: true });
  }

  // Get revenue over time
  getRevenueOverTime(): Observable<{ dates: string[], revenue: number[] }> {
    return this.http.get<{ dates: string[], revenue: number[] }>(`${this.apiUrl}/revenue-over-time`, { withCredentials: true });
  }

  // Delete an invoice by ID
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Add this method to your existing InvoiceService

  getInvoicesPaginated(page: number = 1, perPage: number = 10): Observable<PaginatedResponse<Invoice>> {
    return this.http.get<PaginatedResponse<Invoice>>(
      `${this.apiUrl}?page=${page}&per_page=${perPage}`,
      { withCredentials: true }
    );
  }

}

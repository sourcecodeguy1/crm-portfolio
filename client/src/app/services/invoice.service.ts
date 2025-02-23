import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoiceCount(): Observable<number> {
    return this.http.get<number>('/api/count');
  }

  getPendingInvoiceCount(): Observable<number> {
    return this.http.get<number>('/api/pending');
  }

  getTotalRevenue(): Observable<number> {
    return this.http.get<number>('/api/total-revenue');
  }

  getInvoiceStatusBreakdown(): Observable<{ paid: number, pending: number, overdue: number }> {
    return this.http.get<{ paid: number, pending: number, overdue: number }>('/api/status-breakdown');
  }

  getRevenueOverTime(): Observable<{ dates: string[], revenue: number[] }> {
    return this.http.get<{ dates: string[], revenue: number[] }>('/api/revenue-over-time');
  }

}

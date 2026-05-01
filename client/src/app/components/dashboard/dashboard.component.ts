import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { InvoiceService } from '../../services/invoice.service';
import { Observable, switchMap, catchError, of, take } from 'rxjs';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { ChartsComponent } from '../charts/charts.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [AsyncPipe, ChartsComponent, CurrencyPipe, NgClass, RouterLink],
  standalone: true
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;

  totalClients$: Observable<number>;
  totalInvoices$: Observable<number>;
  pendingInvoices$: Observable<number>;
  totalRevenue$: Observable<number>;
  overdueCount$: Observable<{ count: number }>;
  revenueThisMonth$: Observable<{ this_month: number; last_month: number; change_percent: number | null }>;
  topClients$: Observable<{ id: number; name: string; company: string | null; total_revenue: number; invoice_count: number }[]>;

  private authService = inject(AuthService);
  private clientService = inject(ClientService);
  private invoiceService = inject(InvoiceService);

  constructor() {
    this.user$ = this.authService.user$;

    this.totalClients$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.clientService.getClientCount()),
      catchError(() => of(0))
    );

    this.totalInvoices$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.invoiceService.getInvoiceCount()),
      catchError(() => of(0))
    );

    this.pendingInvoices$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.invoiceService.getPendingInvoiceCount()),
      catchError(() => of(0))
    );

    this.totalRevenue$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.invoiceService.getTotalRevenue()),
      catchError(() => of(0))
    );

    this.overdueCount$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.invoiceService.getOverdueCount()),
      catchError(() => of({ count: 0 }))
    );

    this.revenueThisMonth$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.invoiceService.getRevenueThisMonth()),
      catchError(() => of({ this_month: 0, last_month: 0, change_percent: null }))
    );

    this.topClients$ = this.authService.user$.pipe(
      take(1),
      switchMap(() => this.invoiceService.getTopClients()),
      catchError(() => of([]))
    );
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe();
  }
}

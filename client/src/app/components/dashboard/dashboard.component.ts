import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { InvoiceService } from '../../services/invoice.service';
import { Observable, switchMap, catchError, of } from 'rxjs';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [AsyncPipe, ChartsComponent, CurrencyPipe],
  standalone: true
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;

  totalClients$: Observable<number>;
  totalInvoices$: Observable<number>;
  pendingInvoices$: Observable<number>;
  totalRevenue$: Observable<number>;

  private authService = inject(AuthService);
  private clientService = inject(ClientService);
  private invoiceService = inject(InvoiceService);

  constructor() {
    // Use the auth service's user$ observable directly
    this.user$ = this.authService.user$;

    // Initialize other observables after authentication
    this.totalClients$ = this.authService.user$.pipe(
      switchMap(() => this.clientService.getClientCount()),
      catchError(() => of(0))
    );

    this.totalInvoices$ = this.authService.user$.pipe(
      switchMap(() => this.invoiceService.getInvoiceCount()),
      catchError(() => of(0))
    );

    this.pendingInvoices$ = this.authService.user$.pipe(
      switchMap(() => this.invoiceService.getPendingInvoiceCount()),
      catchError(() => of(0))
    );

    this.totalRevenue$ = this.authService.user$.pipe(
      switchMap(() => this.invoiceService.getTotalRevenue()),
      catchError(() => of(0))
    );
  }

  ngOnInit(): void {
    // Verify authentication state
    this.authService.getUser().subscribe();
  }
}

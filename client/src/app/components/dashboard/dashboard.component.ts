import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { InvoiceService } from '../../services/invoice.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    AsyncPipe,
    DatePipe
  ],
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
    this.user$ = this.authService.user$;

    this.totalClients$ = this.clientService.getClientCount();
    this.totalInvoices$ = this.invoiceService.getInvoiceCount();
    this.pendingInvoices$ = this.invoiceService.getPendingInvoiceCount();
    this.totalRevenue$ = this.invoiceService.getTotalRevenue();
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe();
  }
}

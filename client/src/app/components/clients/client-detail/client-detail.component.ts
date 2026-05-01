import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ClientDetail } from '../../../interfaces/client-detail.interface';
import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  imports: [CurrencyPipe, DatePipe, NgClass, TitleCasePipe, RouterLink],
})
export class ClientDetailComponent implements OnInit {
  client: ClientDetail | null = null;
  loading = true;

  private route = inject(ActivatedRoute);
  private clientService = inject(ClientService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getClient(id).subscribe({
      next: (client) => {
        this.client = client;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get totalRevenue(): number {
    return this.client?.invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + Number(i.amount), 0) ?? 0;
  }

  get pendingCount(): number {
    return this.client?.invoices.filter(i => i.status === 'pending').length ?? 0;
  }

  get overdueCount(): number {
    return this.client?.invoices.filter(i => i.status === 'overdue').length ?? 0;
  }
}

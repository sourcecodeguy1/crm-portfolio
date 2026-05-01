import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of, map } from 'rxjs';
import { Client } from '../../interfaces/client.interface';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  standalone: true
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]> = of([]);
  isAdmin$: Observable<boolean>;

  private clientService = inject(ClientService);
  private authService = inject(AuthService);

  constructor() {
    this.clients$ = this.clientService.getClients();
    this.isAdmin$ = this.authService.user$.pipe(map(u => u?.role === 'admin'));
  }

  ngOnInit(): void {}

  addClient() {
    // Open a modal or navigate to an add-client form
  }

  editClient(client: Client) {
    // Open an edit form
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clients$ = this.clientService.getClients(); // Refresh list
    });
  }
}

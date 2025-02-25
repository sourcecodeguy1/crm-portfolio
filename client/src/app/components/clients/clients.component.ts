import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import {Observable, of} from 'rxjs';
import { Client } from '../../interfaces/client.interface';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  imports: [
    AsyncPipe
  ],
  standalone: true
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]> = of([]);

  private clientService = inject(ClientService);

  constructor() {
    this.clients$ = this.clientService.getClients();
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

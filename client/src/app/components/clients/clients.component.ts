import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of, map } from 'rxjs';
import { Client } from '../../interfaces/client.interface';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddClientModalComponent } from './addClientModal/add-client-modal.component';
import { EditClientModalComponent } from './editClientModal/edit-client-modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  imports: [
    AsyncPipe,
    RouterLink,
    AddClientModalComponent,
    EditClientModalComponent
  ],
  standalone: true
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]> = of([]);
  isAdmin$: Observable<boolean>;
  showAddModal = false;
  showEditModal = false;
  selectedClient: Client | null = null;

  private clientService = inject(ClientService);
  private authService = inject(AuthService);

  constructor() {
    this.clients$ = this.clientService.getClients();
    this.isAdmin$ = this.authService.user$.pipe(map(u => u?.role === 'admin'));
  }

  ngOnInit(): void {}

  addClient() {
    this.showAddModal = true;
  }

  editClient(client: Client) {
    this.selectedClient = client;
    this.showEditModal = true;
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clients$ = this.clientService.getClients();
    });
  }

  onClientAdded(clientData: any) {
    this.clientService.createClient(clientData).subscribe(() => {
      this.clients$ = this.clientService.getClients();
      this.showAddModal = false;
    });
  }

  onClientUpdated(clientData: any) {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.id, clientData).subscribe(() => {
        this.clients$ = this.clientService.getClients();
        this.showEditModal = false;
        this.selectedClient = null;
      });
    }
  }

  onClientClosed() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedClient = null;
  }
}

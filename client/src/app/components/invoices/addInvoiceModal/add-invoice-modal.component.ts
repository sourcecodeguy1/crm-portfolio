import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client.service';
import { Observable } from 'rxjs';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-add-invoice-modal',
  templateUrl: './add-invoice-modal.component.html',
  styleUrls: ['./add-invoice-modal.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddInvoiceModalComponent implements OnInit {
  @Output() invoiceAdded = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();
  invoiceForm: FormGroup;
  clients$: Observable<Client[]>;

  private clientService = inject(ClientService);

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      client_id: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      due_date: ['', [Validators.required]],
      status: ['pending']
    });
    this.clients$ = this.clientService.getClients();
  }

  ngOnInit(): void {}

  submit() {
    if (this.invoiceForm.valid) {
      this.invoiceAdded.emit(this.invoiceForm.value);
    }
  }
  close() {
    this.closed.emit();
  }
}

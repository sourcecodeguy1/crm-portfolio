import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../../interfaces/invoice.interface';
import { ClientService } from '../../../services/client.service';
import { Observable } from 'rxjs';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-edit-invoice-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-invoice-modal.component.html',
  styleUrl: './edit-invoice-modal.component.scss'
})
export class EditInvoiceModalComponent implements OnChanges, OnInit {
  @Input() invoice: Invoice | null = null;
  @Output() invoiceEdited = new EventEmitter<any>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['invoice'] && this.invoice) {
      this.invoiceForm.patchValue({
        client_id: this.invoice.client_id,
        amount: this.invoice.amount,
        due_date: this.invoice.due_date,
        status: this.invoice.status
      });
    }
  }

  submit() {
    if (this.invoiceForm.valid) {
      this.invoiceEdited.emit(this.invoiceForm.value);
    }
  }

  close() {
    this.closed.emit();
  }
}

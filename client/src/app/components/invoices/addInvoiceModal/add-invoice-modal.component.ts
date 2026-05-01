import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-invoice-modal',
  templateUrl: './add-invoice-modal.component.html',
  styleUrls: ['./add-invoice-modal.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddInvoiceModalComponent {
  @Output() invoiceAdded = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();
  invoiceForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      client_id: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      due_date: ['', [Validators.required]],
      status: ['pending']
    });
  }
  submit() {
    if (this.invoiceForm.valid) {
      this.invoiceAdded.emit(this.invoiceForm.value);
    }
  }
  close() {
    this.closed.emit();
  }
}

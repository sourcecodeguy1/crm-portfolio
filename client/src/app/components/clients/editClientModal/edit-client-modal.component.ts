import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-edit-client-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-client-modal.component.html',
  styleUrl: './edit-client-modal.component.scss'
})
export class EditClientModalComponent implements OnChanges {
  @Input() client: Client | null = null;
  @Output() clientEdited = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [''],
      company: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['client'] && this.client) {
      this.clientForm.patchValue({
        name: this.client.name,
        email: this.client.email,
        phone_number: this.client.phone_number,
        company: this.client.company
      });
    }
  }

  submit() {
    if (this.clientForm.valid) {
      this.clientEdited.emit(this.clientForm.value);
    }
  }

  close() {
    this.closed.emit();
  }
}


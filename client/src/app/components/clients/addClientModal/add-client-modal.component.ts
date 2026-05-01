import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddClientModalComponent {
  @Output() clientAdded = new EventEmitter<any>();
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
  submit() {
    if (this.clientForm.valid) {
      this.clientAdded.emit(this.clientForm.value);
    }
  }
  close() {
    this.closed.emit();
  }
}

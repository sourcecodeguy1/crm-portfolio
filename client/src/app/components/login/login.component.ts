import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginAsDemo() {
    this.loginForm.setValue({
      email: 'demo@juliowebmaster.com',
      password: 'password',
    });
    this.onSubmit();
  }

  onSubmit() {
    this.authService.initializeSanctum().subscribe(() => {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
          next: () => {
            // Fetch user info after login to confirm authentication
            this.authService.getUser().subscribe({
              next: user => {
                this.router.navigate(['/dashboard']);
              },
              error: err => {
                // Handle error (e.g., show a message)
                console.error('Failed to fetch user:', err);
              }
            });
          },
          error: (error) => console.error('Login error:', error)
        });
      }
    });
  }


}

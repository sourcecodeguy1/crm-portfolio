import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  standalone: true
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout().subscribe();
  }
}

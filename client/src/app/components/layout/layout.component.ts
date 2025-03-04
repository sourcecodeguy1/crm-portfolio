import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,   // For ngClass and other common directives
    RouterOutlet,   // For <router-outlet>
    RouterLink      // For routerLink directive
  ]
})
export class LayoutComponent implements OnInit {
  isSidebarVisible = true; // Default to visible

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if we have a stored sidebar state
    const storedState = localStorage.getItem('sidebarVisible');
    if (storedState !== null) {
      this.isSidebarVisible = storedState === 'true';
    } else {
      // Default to hidden on mobile, visible on desktop
      this.isSidebarVisible = window.innerWidth >= 768;
    }
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    // Store preference
    localStorage.setItem('sidebarVisible', this.isSidebarVisible.toString());
  }

  closeOnMobile(): void {
    // Auto-close sidebar on mobile when navigating
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

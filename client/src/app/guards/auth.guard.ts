import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard: Checking authentication...');
    if (this.authService.isLoggedIn()) {
      return true;
    }
    console.log('AuthGuard: User is NOT logged in ❌ Redirecting to /login');
    this.router.navigate(['/login']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response.interface';
import {User} from '../interfaces/user.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {}

  get apiUrl() {
    return this.configService.getConfig().apiUrl;
  }

  initializeSanctum(): Observable<any> {
    // Remove trailing /api or /api/ from apiUrl to get the base API domain
    const baseUrl = this.apiUrl.replace(/\/api\/?$/, '');
    return this.http.get(`${baseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }


  // Register User
  register(user: { name: string; email: string; password: string; password_confirmation: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  // Helper to get a cookie by name
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  // Login User
  login(email: string, password: string): Observable<AuthResponse> {
    const xsrfToken = this.getCookie('XSRF-TOKEN');
    const headers = xsrfToken ? new HttpHeaders({ 'X-XSRF-TOKEN': xsrfToken }) : undefined;
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true, headers }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  // Login with Sanctum CSRF protection
  loginWithSanctum(email: string, password: string): Observable<AuthResponse> {
    return this.initializeSanctum().pipe(
      switchMap(() => this.login(email, password))
    );
  }

  // Get Authenticated User
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }),
      withCredentials: true
    }).pipe(
      tap((user: User) => {
        this.userSubject.next(user);
      })
    );
  }

  // Logout User
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, { withCredentials: true,
      headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }),
    }).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }


  // Get Token from Local Storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check If User Is Logged In
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

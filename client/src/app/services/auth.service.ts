import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    return this.http.get('/sanctum/csrf-cookie');
  }


  // Register User
  register(user: { name: string; email: string; password: string; password_confirmation: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  // Login User
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  // Get Authenticated User
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }),
    }).pipe(
      tap((user: User) => {
        this.userSubject.next(user);
      })
    );
  }

  // Logout User
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, {
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

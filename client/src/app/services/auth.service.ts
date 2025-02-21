import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Register User
  register(user: { name: string; email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login User
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.userSubject.next(res.user);
      })
    );
  }

  // Get Authenticated User
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }),
    }).pipe(
      tap((user) => this.userSubject.next(user))
    );
  }

  // Logout User
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }),
    }).subscribe(() => {
      localStorage.removeItem(this.tokenKey);
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    });
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

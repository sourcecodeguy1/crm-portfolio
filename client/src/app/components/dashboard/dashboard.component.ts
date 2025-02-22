import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import {AsyncPipe, DatePipe} from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    AsyncPipe,
    DatePipe
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;

  private authService = inject(AuthService);

  constructor() {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => (this.user$ = user));
  }

  logout() {
    this.authService.logout().subscribe();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://v2-jumic-backend.onrender.com/api';
  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(name: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { name, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

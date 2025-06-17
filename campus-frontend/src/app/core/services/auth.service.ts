// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, campus: string): Observable<any> {
    return this.http.post('/api/register', { name, email, password, campus });
  }

  login(email: string, password: string): Observable<any> {
    // Replace this mock implementation with actual HTTP request logic
    if (email === 'test@example.com' && password === 'password') {
      return of({ token: 'mock-token' });
    } else {
      return new Observable(observer => {
        observer.error({ error: { message: 'Invalid credentials' } });
      });
    }
  }

  // other
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface User {
  token: string;
  // add other fields returned by your API, e.g. name, email, campus, _id
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(user => localStorage.setItem('currentUser', JSON.stringify(user)))
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    campus: string
  ) {
    return this.http
      .post<User>(`${this.apiUrl}/auth/register`, {
        name,
        email,
        password,
        campus
      })
      .pipe(
        tap(user => localStorage.setItem('currentUser', JSON.stringify(user)))
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}

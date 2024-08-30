import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jwt } from '../core.module';

import { jwtDecode } from 'jwt-decode';
import { LoginDto, RegisterDto } from '../../modules/auth/auth.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7092/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerDto);
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<Jwt>(`${this.apiUrl}/login`, loginDto).pipe(
      map((response) => {
        // JWT is stored in localstorage
        localStorage.setItem('authToken', response.token);
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    // Check expiry of the JWT
    const token = localStorage.getItem('authToken');

    if (!token) return false;

    // Use jwt-decode library to decode the jwt and retrieve the expiry date
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp! * 1000);
    const currentDate = new Date();

    return expirationDate > currentDate;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jwt } from '../../core.module';
import { LoginDto, RegisterDto } from '../../../modules/auth/auth.module';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7092/api/v1/auth';

  constructor(private http: HttpClient, private jwt: JwtService) {}

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerDto);
  }

  login(loginDto: LoginDto, rememberMe: boolean): Observable<any> {
    return this.http.post<Jwt>(`${this.apiUrl}/login`, loginDto).pipe(
      map((response) => {
        // JWT is stored in localstorage if user checks 'Remember Me'
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', response.token);
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    // Check expiry of the JWT
    // Use jwt-decode library to decode the jwt and retrieve the expiry date
    const decodedToken = this.jwt.getDecodedToken();

    if (decodedToken === null) return false;

    const expirationDate = new Date(decodedToken.exp! * 1000);
    const currentDate = new Date();

    return expirationDate > currentDate;
  }
}

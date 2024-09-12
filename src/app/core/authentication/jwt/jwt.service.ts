import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getAuthToken(): string | null {
    return (
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    );
  }

  getDecodedToken(): any | null {
    const token = this.getAuthToken();

    return token ? jwtDecode(token) : null;
  }

  getAuthorizationHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return headers;
  }

  getUserIdFromJwt(): string | null {
    const decodedToken = this.getDecodedToken();

    // Claim nameid is the user's id
    return decodedToken ? decodedToken.nameid : null;
  }

  getUsernameFromJwt(): string | null {
    const decodedToken = this.getDecodedToken();

    // Claim nameid is the user's id
    return decodedToken ? decodedToken.unique_name : null;
  }
}

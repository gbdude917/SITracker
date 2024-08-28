import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adversary } from '../../modules/adversaries/adversary.module';
import { Spirit } from '../../modules/spirits/spirit.module';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'https://localhost:7092/api/v1';

  constructor(private http: HttpClient) {}

  /** SPIRITS **/
  getSpirits(): Observable<Spirit[]> {
    return this.http.get<Spirit[]>(`${this.API_URL}/spirits`);
  }

  getSpiritById(id: number): Observable<Spirit> {
    return this.http.get<Spirit>(`${this.API_URL}/spirits/${id}`);
  }

  getSpiritByPathname(name: string): Observable<Spirit> {
    // Convert spaces to underscores
    const pathname = name.replaceAll(' ', '_');

    return this.http.get<Spirit>(
      `${this.API_URL}/spirits/pathname/${pathname}`
    );
  }

  /** ADVERSARIES **/
  getAdversaries(): Observable<Adversary[]> {
    return this.http.get<Adversary[]>(`${this.API_URL}/adversaries`);
  }

  getAdversaryById(id: number): Observable<Adversary> {
    return this.http.get<Adversary>(`${this.API_URL}/adversaries/${id}`);
  }

  getAdversaryByPathname(name: string): Observable<Adversary> {
    // Convert spaces to underscores
    const pathname = name.replaceAll(' ', '_');

    return this.http.get<Adversary>(
      `${this.API_URL}/adversaries/pathname/${pathname}`
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spirit } from '../../modules/spirits/spirit.module';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'https://localhost:7092/api/v1';

  constructor(private http: HttpClient) {}

  /** SPIRITS **/
  getSpirits(): Observable<any[]> {
    return this.http.get<Spirit[]>(`${this.API_URL}/spirits`);
  }
}

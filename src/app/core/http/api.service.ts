import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adversary } from '../../modules/adversaries/adversary.module';
import { Spirit } from '../../modules/spirits/spirit.module';
import {
  UpdatePasswordDto,
  UpdateUsernameDto,
  User,
} from '../../modules/profile/profile.module';
import { JwtService } from '../authentication/jwt/jwt.service';
import {
  GameSession,
  GameSessionDto,
  GameSessionsResponse,
} from '../../modules/game-sessions/game-session.module';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'https://localhost:7092/api/v1';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

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

  /** USERS **/
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${id}`);
  }

  updateUsername(
    id: number,
    updateUsernameDto: UpdateUsernameDto
  ): Observable<User> {
    const headers = this.jwtService.getAuthorizationHeaders();

    // Update payload to match expected DTO in backend
    const transformedPayload = {
      new_username: updateUsernameDto.newUsername,
    };

    return this.http.patch<User>(
      `${this.API_URL}/users/update-username/${id}`,
      transformedPayload,
      { headers: headers }
    );
  }

  updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto
  ): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeaders();

    // Update payload to match expected DTO in backend
    const transformedPayload = {
      old_password: updatePasswordDto.oldPassword,
      new_password: updatePasswordDto.newPassword,
    };

    console.log(transformedPayload);

    return this.http.patch<any>(
      `${this.API_URL}/users/update-password/${id}`,
      transformedPayload,
      { headers: headers }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/users/update-username/${id}`);
  }

  /** GAME SESSIONS **/
  getMyGameSessions(): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeaders();

    return this.http.get<GameSessionsResponse>(
      `${this.API_URL}/game-sessions/my-game-sessions`,
      { headers: headers }
    );
  }

  getGameSessionById(id: number): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeaders();

      return this.http.get<GameSession>(
         `${this.API_URL}/game-sessions/${id}`,
         { headers: headers}
      )
  }

  // createGameSession(createGameSessionDto: GameSessionDto): Observable<any> {

  // }

  // updateGameSession(id:number, updateGameSessionDto: GameSessionDto): Observable<any> {

  // }

  // deleteGameSession(id: number): Observable<any> {

  // }
}

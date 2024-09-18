import { Component, OnInit } from '@angular/core';
import { GameSessionCardComponent } from '../../components/game-session-card/game-session-card.component';
import { GameSession } from '../../game-session.module';
import { ApiService } from '../../../../core/http/api.service';

@Component({
  selector: 'app-game-sessions',
  standalone: true,
  imports: [GameSessionCardComponent],
  templateUrl: './game-sessions.component.html',
  styleUrl: './game-sessions.component.css',
})
export class GameSessionsComponent implements OnInit {
  gameSessions!: GameSession[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMyGameSessions().subscribe({
      next: (response) => {
        this.gameSessions = response.value;
      },
      error: (error) => {
        // TODO: handle this error
        console.log("Error displaying user's game sessions: ", error.message);
      },
    });
  }
}

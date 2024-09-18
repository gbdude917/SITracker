import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/http/api.service';
import { GameSession } from '../../game-session.module';

@Component({
  selector: 'app-game-session-details',
  standalone: true,
  imports: [],
  templateUrl: './game-session-details.component.html',
  styleUrl: './game-session-details.component.css',
})
export class GameSessionDetailsComponent implements OnInit {
  gameSession!: GameSession;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const gameSessionId = this.getGameSessionId();

    this.loadGameSessionById(gameSessionId);
  }

  private getGameSessionId() {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId) {
      const gameSessionId = +paramId;

      if (isNaN(gameSessionId)) throw new Error('Invalid game session ID.');

      return gameSessionId;
    } else {
      throw new Error('Game session ID is null.');
    }
  }

  private loadGameSessionById(id: number) {
    this.apiService.getGameSessionById(id).subscribe((data) => {
      this.gameSession = data;
    });
  }
}

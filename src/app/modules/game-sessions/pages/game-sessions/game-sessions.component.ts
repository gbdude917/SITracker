import { Component, OnInit, signal, Signal } from '@angular/core';
import { GameSessionCardComponent } from '../../components/game-session-card/game-session-card.component';
import { GameSession } from '../../game-session.module';
import { ApiService } from '../../../../core/http/api.service';
import { CreateGameSessionModalComponent } from '../../components/create-game-session-modal/create-game-session-modal.component';

@Component({
  selector: 'app-game-sessions',
  standalone: true,
  imports: [GameSessionCardComponent, CreateGameSessionModalComponent],
  templateUrl: './game-sessions.component.html',
  styleUrl: './game-sessions.component.css',
})
export class GameSessionsComponent implements OnInit {
  gameSessions!: GameSession[];

  isModalOpen = signal(false);

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

  onNewGameSession(): void {
    // Toggle the modal
    this.isModalOpen.update((value) => !value);

    console.log('Adding new game...');
  }

  closeModal(): void {
    this.isModalOpen.update((value) => !value);
  }
}

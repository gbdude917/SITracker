import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-game-session-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-game-session-modal.component.html',
  styleUrl: './create-game-session-modal.component.css',
})
export class CreateGameSessionModalComponent {
  @Input({ required: true }) isModalOpen!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}

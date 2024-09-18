import { Component, Input, OnInit } from '@angular/core';
import { GameSession } from '../../game-session.module';
import { RouterLink } from '@angular/router';
import { User } from '../../../profile/profile.module';
import { Spirit } from '../../../spirits/spirit.module';
import { Adversary } from '../../../adversaries/adversary.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-game-session-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './game-session-card.component.html',
  styleUrl: './game-session-card.component.css',
  providers: [DatePipe],
})
export class GameSessionCardComponent implements OnInit {
  @Input({ required: true }) gameSession!: GameSession;

  id!: number;
  user!: User;
  spirit!: Spirit;
  adversary!: Adversary;
  board!: string;
  sessionName!: string;
  description!: string;
  playedOn!: string;
  result!: string;
  isCompleted!: boolean;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    const {
      id,
      user,
      spirit,
      adversary,
      board,
      sessionName,
      description,
      playedOn,
      result,
      isCompleted,
    } = this.gameSession;

    this.id = id;
    this.user = user;
    this.spirit = spirit;
    this.adversary = adversary;
    this.board = board;
    this.sessionName = sessionName;
    this.description = description;
    this.playedOn = this.datePipe.transform(playedOn, 'mediumDate')!;
    this.result = result;
    this.isCompleted = isCompleted;
  }
}

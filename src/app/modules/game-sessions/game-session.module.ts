import { Adversary } from '../adversaries/adversary.module';
import { Spirit } from '../spirits/spirit.module';
import { User } from '../profile/profile.module';

export interface GameSession {
  id: number;
  user: User;
  spirit: Spirit;
  adversary: Adversary;
  board: string;
  sessionName: string;
  description: string;
  playedOn: string; // ISO 8601 date string
  result: string;
  isCompleted: boolean;
}

export interface GameSessionDto {
  userId: number;
  spiritId: number;
  adversaryId: number;
  board: string;
  sessionName: string;
  description: string;
  playedOn: Date;
  result: string;
  isCompleted: boolean;
}

export interface GameSessionsResponse {
  reulst: string;
  value: GameSession[];
}

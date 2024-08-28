import { Routes } from '@angular/router';

import { HomeComponent } from './modules/home/pages/home/home.component';
import { SpiritsComponent } from './modules/spirits/pages/spirits/spirits.component';
import { AdversariesComponent } from './modules/adversaries/pages/adversaries/adversaries.component';
import { GameSessionsComponent } from './modules/game-sessions/pages/game-sessions/game-sessions.component';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { AboutComponent } from './modules/about/pages/about/about.component';
import { SpiritDetailsComponent } from './modules/spirits/pages/spirit-details/spirit-details.component';
import { AdversaryDetailsComponent } from './modules/adversaries/pages/adversary-details/adversary-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spirits', component: SpiritsComponent },
  { path: 'adversaries', component: AdversariesComponent },
  { path: 'game-sessions', component: GameSessionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'spirits/:name', component: SpiritDetailsComponent },
  { path: 'spirits/:name', component: AdversaryDetailsComponent },
];

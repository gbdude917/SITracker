import { Routes } from '@angular/router';

import { HomeComponent } from './modules/home/pages/home/home.component';
import { SpiritsComponent } from './modules/spirits/pages/spirits/spirits.component';
import { AdversariesComponent } from './modules/adversaries/pages/adversaries/adversaries.component';
import { GameSessionsComponent } from './modules/game-sessions/pages/game-sessions/game-sessions.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { AboutComponent } from './modules/about/pages/about/about.component';
import { SpiritDetailsComponent } from './modules/spirits/pages/spirit-details/spirit-details.component';
import { AdversaryDetailsComponent } from './modules/adversaries/pages/adversary-details/adversary-details.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { authGuard } from './core/authentication/auth/auth.guard';
import { ProfilePageComponent } from './modules/profile/profile-page/profile-page.component';
import { GameSessionDetailsComponent } from './modules/game-sessions/pages/game-session-details/game-session-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spirits', component: SpiritsComponent },
  { path: 'adversaries', component: AdversariesComponent },
  {
    path: 'game-sessions',
    component: GameSessionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'game-sessions/:id',
    component: GameSessionDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'spirits/:name', component: SpiritDetailsComponent },
  { path: 'adversaries/:name', component: AdversaryDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

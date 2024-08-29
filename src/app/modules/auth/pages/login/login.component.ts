import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Logging in...');

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/game-sessions']);
      },
      error: (error) => {
        console.log('Cannot login');

        // TODO: Output an error logging in on screen
      },
    });
  }
}

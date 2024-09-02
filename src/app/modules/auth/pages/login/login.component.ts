import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    console.log('Logging in...');

    const loginDto = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService
      .login(loginDto, this.loginForm.value.rememberMe)
      .subscribe({
        next: (response) => {
          console.log('Login successful!');

          this.router.navigate(['/game-sessions']);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  handleError(error: any): void {
    if (error.status === 400) {
      this.errorMessage = 'Username or password is incorrect.';
    } else {
      this.errorMessage =
        'An unexpected error has occurred. Please try again later.';
    }
  }
}

import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

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
    console.log(this.loginForm.value);

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
          console.log('Error logging in: ' + error.error);

          // TODO: Output an error loggin in on screen
        },
      });
  }
}

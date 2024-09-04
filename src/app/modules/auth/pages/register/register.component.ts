import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../../core/authentication/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { noWhiteSpaceValidator } from '../../../../shared/directives/no-whitespace-validator.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, noWhiteSpaceValidator]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, noWhiteSpaceValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  /**
   * Check if the two passwords the user entered match
   *
   * @param control The FormGroup containing the password and confirmPassword
   * @returns Password mismatch error if password !== confirmPassword, otherwise null
   */
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    console.log('Registering user...');
    if (this.registerForm.valid) {
      // Convert FormGroup to a proper RegisterDto to match API's specification
      const registerDto = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.authService.register(registerDto).subscribe({
        next: (response) => {
          console.log('Successfully registered!', response);
          this.router.navigate(['/login']);

          // Reset the form
          this.registerForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      });
    } else {
      console.log('Could not register your account!');

      const userControl = this.registerForm.get('username');
      const emailControl = this.registerForm.get('email');
      const passwordControl = this.registerForm.get('password');
      const confirmPasswordControl = this.registerForm.get('confirmPassword');

      if (userControl?.hasError('required')) {
        this.errorMessage = 'Username is required.';
      } else if (userControl?.hasError('whitespace')) {
        this.errorMessage = 'Username cannot have whitespaces.';
      }

      if (emailControl?.hasError('required')) {
        this.errorMessage = 'Email is required.';
      } else if (emailControl?.hasError('email')) {
        this.errorMessage = 'Invalid email format.';
      }

      if (passwordControl?.hasError('required')) {
        this.errorMessage = 'Password is required.';
      } else if (passwordControl?.hasError('minlength')) {
        this.errorMessage = 'Password must be at least 6 characters long.';
      } else if (passwordControl?.hasError('whitespace')) {
        this.errorMessage = 'Password cannot have whitespaces.';
      }

      if (confirmPasswordControl?.hasError('required')) {
        this.errorMessage = 'Confirm Password is required.';
      }

      // Check for custom password mismatch error
      if (this.registerForm.hasError('passwordMismatch')) {
        this.errorMessage = 'Passwords do not match.';
      }
    }
  }
}

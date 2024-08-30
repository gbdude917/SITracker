import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../../core/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationFailed: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.registrationFailed = false;
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
          this.registrationFailed = true;

          // TODO: Use registrationFailed to display some error to user
        },
      });
    } else {
      console.log('Could not register your account!');

      const emailControl = this.registerForm.get('email');
      const passwordControl = this.registerForm.get('password');
      const confirmPasswordControl = this.registerForm.get('confirmPassword');

      if (emailControl?.hasError('required')) {
        console.log('Email is required.');
      } else if (emailControl?.hasError('email')) {
        console.log('Invalid email format.');
      }

      if (passwordControl?.hasError('required')) {
        console.log('Password is required.');
      } else if (passwordControl?.hasError('minlength')) {
        console.log('Password must be at least 6 characters long.');
      }

      if (confirmPasswordControl?.hasError('required')) {
        console.log('Confirm Password is required.');
      }

      // Check for custom password mismatch error
      if (this.registerForm.hasError('passwordMismatch')) {
        console.log('Passwords do not match.');
      }
    }
  }
}

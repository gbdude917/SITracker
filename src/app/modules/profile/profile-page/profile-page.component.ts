import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/http/api.service';
import { AuthService } from '../../../core/authentication/auth/auth.service';
import { JwtService } from '../../../core/authentication/jwt/jwt.service';
import { noWhiteSpaceValidator } from '../../../shared/directives/no-whitespace-validator.directive';
import { ErrorMessageComponent } from '../../auth/components/error-message/error-message.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  username!: string;
  updateUsernameForm: FormGroup;
  updatePasswordForm: FormGroup;
  deleteUserForm: FormGroup;

  usernameErrorMessage?: string;
  passwordErrorMessage?: string;
  deleteErrorMessage?: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateUsernameForm = this.formBuilder.group({
      newUsername: ['', [Validators.required, noWhiteSpaceValidator]],
    });

    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, noWhiteSpaceValidator]],
      newPassword: ['', [Validators.required, noWhiteSpaceValidator]],
      confirmPassword: ['', [Validators.required, noWhiteSpaceValidator]],
    });

    this.deleteUserForm = this.formBuilder.group({
      username: ['', [Validators.required, noWhiteSpaceValidator]],
    });
  }

  ngOnInit(): void {
    this.username = this.jwtService.getUsernameFromJwt()!;
  }

  onUpdateUsername(): void {
    if (this.updateUsernameForm.invalid) {
      this.usernameErrorMessage = 'Invalid form.';
      console.log('Update username form is invalid.');
      return;
    }

    const userId = this.getUserId();

    const updateUsernameDto = {
      newUsername: this.updateUsernameForm.value.newUsername,
    };

    this.apiService.updateUsername(userId, updateUsernameDto).subscribe({
      next: (response) => {
        this.authService.logout();

        this.router.navigate(['/login']);

        console.log('Username updated');
      },
      error: (error) => {
        if (error.code === 409) {
          console.log('Username is already taken.');
          this.usernameErrorMessage = 'Username is already taken.';
        } else {
          console.log('An error has occurred: ', error.message);
          this.usernameErrorMessage = 'Something went wrong.';
        }
      },
    });
  }

  onUpdatePassword(): void {
    if (this.updatePasswordForm.invalid) {
      this.passwordErrorMessage = 'Invalid form.';
      console.log('Update password form is invalid.');
      return;
    }

    // Check that new password is confirmed
    if (
      this.updatePasswordForm.value.newPassword !=
      this.updatePasswordForm.value.confirmPassword
    ) {
      console.log('New password does not match confirmation password');

      // TODO: Display error notification
      this.passwordErrorMessage = 'Passwords do not match!';

      return;
    }

    const userId = this.getUserId();

    const updatePasswordDto = {
      oldPassword: this.updatePasswordForm.value.oldPassword,
      newPassword: this.updatePasswordForm.value.newPassword,
    };

    this.apiService.updatePassword(userId, updatePasswordDto).subscribe({
      next: (response) => {
        this.authService.logout();

        this.router.navigate(['/login']);

        console.log('Password updated');
      },
      error: (error) => {
        console.log('An error has occurred: ', error.message);

        this.passwordErrorMessage = 'Something went wrong.';
      },
    });
  }

  onDeleteAccount(): void {
    if (this.deleteUserForm.invalid) {
      this.deleteErrorMessage = 'Confirm your username to delete your account.';
      console.log('Delete form is invalid.');
      return;
    }

    console.log('Deleting account...');

    // Validate that user wants to delete their account
    const username = this.jwtService.getUsernameFromJwt();

    if (username != this.deleteUserForm.value.username) {
      this.deleteErrorMessage = 'Confirm your username to delete your account.';
      return;
    }

    this.apiService.deleteUser(this.getUserId()).subscribe({
      next: (response) => {
        console.log(
          'Sucessfully deleted user:',
          this.jwtService.getUsernameFromJwt()
        );
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.code === 404) {
          console.log('User to delete not found.');
          this.deleteErrorMessage = 'User not found.';
        }

        console.log('An error has occurred: ', error.message);

        this.deleteErrorMessage = 'Something went wrong.';
      },
    });
  }

  onLogout(): void {
    this.authService.logout();

    // Route back to home page
    this.router.navigate(['/']);
  }

  getUserId(): number {
    const userIdStr = this.jwtService.getUserIdFromJwt();

    if (userIdStr) {
      const userId = +userIdStr;

      if (isNaN(userId)) {
        throw new Error('Invalid user id.');
      }

      return userId;
    } else {
      throw new Error(
        'User ID is null. Please log in to change your username.'
      );
    }
  }
}

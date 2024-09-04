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

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  username!: string;
  updateUsernameForm: FormGroup;
  updatePasswordForm: FormGroup;
  deleteUserForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateUsernameForm = this.formBuilder.group({
      newUsername: ['', [Validators.required]],
    });

    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this.deleteUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.username = this.jwtService.getUsernameFromJwt()!;
  }

  onSubmit(type: string): void {
    // TODO: Handle the various submit from the 3 different forms
    console.log(type);
  }
}

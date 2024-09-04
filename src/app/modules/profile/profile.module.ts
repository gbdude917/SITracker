export interface User {
  id: string;
  user: string;
  email?: string;
  registrationDate: string;
  lastPasswordChange?: string;
}

export interface UpdateUsernameDto {
  newUsername: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

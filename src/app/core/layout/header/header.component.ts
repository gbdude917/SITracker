import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../authentication/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  screenWidth = window.innerWidth;
  isMenuOpen = false;
  isMobileView = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;

    if (window.innerWidth < 640) {
      this.isMobileView = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;

    if (window.innerWidth < 640) {
      this.isMobileView = true;
    }
  }

  getIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onLogout(): void {
    this.authService.logout();

    // Close the menu if in mobile view
    if (this.isMenuOpen) this.closeMenu();

    // Route back to home page
    this.router.navigate(['/']);
  }
}

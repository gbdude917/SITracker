import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}

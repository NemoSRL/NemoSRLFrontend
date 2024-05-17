import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSidebarOpen = false;
  activeSubMenu: string | null = null;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  showSubMenu(menuItem: string) {
    this.activeSubMenu = menuItem;
  }

  hideSubMenu(menuItem: string) {
    if (this.activeSubMenu === menuItem) {
      this.activeSubMenu = null;
    }
  }

  keepSubMenuOpen(menuItem: string) {
    this.activeSubMenu = menuItem;
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isApriNavVis = true;
  isSidebarOpen = false;
  activeSubMenu: string | null = null;
  @ViewChild('apriNav', { static: false }) apriNav!: ElementRef;

  toggleNav(visibile : boolean) : void {
    if(visibile)
      this.apriNav.nativeElement.style.display = 'none';
    else
      this.apriNav.nativeElement.style.display = 'block';
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleNav(this.isApriNavVis)
    this.isApriNavVis = !this.isApriNavVis;
    console.log("ciao")
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

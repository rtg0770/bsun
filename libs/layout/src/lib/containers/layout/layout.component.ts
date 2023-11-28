import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'bishub-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile?: boolean;
  // Set the initial sidenav mode
  sidenavMode: 'side' | 'over' = 'side';
  logoLoaded = false;

  // The breakpoint to switch sidenav modes
  private sidenavBreakpoint = 992;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < this.sidenavBreakpoint;
    this.checkSidenavMode();
  }

  onLogoLoad() {
    this.logoLoaded = true;
  }

  ngOnInit() {
    this.checkSidenavMode();
  }

  toggleSidenav(): void {
    console.log('Toggling sidenav');
    this.sidenav.toggle();
  }

  // Check sidenav mode based on window width
  private checkSidenavMode(): void {
    if (window.innerWidth < this.sidenavBreakpoint) {
      this.sidenavMode = 'over';
    } else {
      this.sidenavMode = 'side';
    }
  }
}

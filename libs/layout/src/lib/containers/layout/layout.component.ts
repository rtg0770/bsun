import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'bishub-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Set the initial sidenav mode
  sidenavMode: 'side' | 'over' = 'side';

  // The breakpoint to switch sidenav modes
  private sidenavBreakpoint = 992;

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkSidenavMode();
  }

  ngOnInit() {
    this.checkSidenavMode();
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

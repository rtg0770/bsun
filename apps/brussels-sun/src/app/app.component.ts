import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'bishub-energy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Green Energy Portal';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/menu.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'solar-power',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/solar_power.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'request-quote',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/request_quote.svg'
      )
    );
  }
}

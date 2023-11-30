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
      'arrow_down',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/arrow_down.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'expand-more',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/expand-more.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/logo-small.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'call',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/call.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'email',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/email.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/menu.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'solar',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/solar.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/search.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'library',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/library.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'request',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/request.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'safety',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/safety.svg'
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

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@bishub-energy/layout';
import { PublicPagesModule } from '@bishub-energy/public-pages';
import { ConfigService } from '@bishub-energy/shared-services';
import { environment } from '../environments/environment';

export function initializeApp(configService: ConfigService) {
  return () => (configService.googleMapsApiKey = environment.googleMapsApiKey);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    PublicPagesModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

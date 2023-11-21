import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsAutocompleteComponent } from '@rng077/google-maps-autocomplete';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    GoogleMapsAutocompleteComponent,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

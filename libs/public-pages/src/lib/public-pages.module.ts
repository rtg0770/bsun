import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { MaterialModule } from '@bishub-energy/shared-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsAutocompleteComponent } from '@rng077/google-maps-autocomplete';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  imports: [
    GoogleMapsAutocompleteComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    PublicPagesRoutingModule,
  ],
  declarations: [HomepageComponent, QuoteFormComponent, AboutUsComponent],
  providers: [],
})
export class PublicPagesModule {}

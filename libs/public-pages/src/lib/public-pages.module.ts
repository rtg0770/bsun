import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { MaterialModule } from '@bishub-energy/shared-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsAutocompleteComponent } from '@tellycz/google-maps-autocomplete';
import { ConfigService } from '@bishub-energy/shared-services';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    PublicPagesRoutingModule,
    GoogleMapsAutocompleteComponent,
  ],
  declarations: [HomepageComponent, QuoteFormComponent],
  providers: [ConfigService],
})
export class PublicPagesModule {}

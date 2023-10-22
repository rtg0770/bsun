import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';

@NgModule({
  imports: [CommonModule, PublicPagesRoutingModule],
  declarations: [HomepageComponent, QuoteFormComponent],
})
export class PublicPagesModule {}

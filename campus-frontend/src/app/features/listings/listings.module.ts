import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { ListingListComponent }   from './listing-list/listing-list.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingFormComponent }   from './listing-form/listing-form.component';

@NgModule({
  declarations: [
    ListingListComponent,
    ListingDetailComponent,
    ListingFormComponent
  ],
  imports: [
    CommonModule,
    ListingsRoutingModule
  ]
})
export class ListingsModule {}

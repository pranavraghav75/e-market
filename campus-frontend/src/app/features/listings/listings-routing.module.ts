import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingListComponent }   from './listing-list/listing-list.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingFormComponent }   from './listing-form/listing-form.component';
import { AuthGuard }              from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '',          component: ListingListComponent },
  { path: 'new',       component: ListingFormComponent,    canActivate: [AuthGuard] },
  { path: ':id',       component: ListingDetailComponent },
  { path: ':id/edit',  component: ListingFormComponent,    canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/listings/listing-list/listing-list.component').then(m => m.ListingListComponent)
  },
  {
    path: 'listings/:id',
    loadComponent: () =>
      import('./features/listings/listing-detail/listing-detail.component').then(m => m.ListingDetailComponent)
  },
  {
    path: 'listings/new',
    loadComponent: () =>
      import('./features/listings/listing-form/listing-form.component').then(m => m.ListingFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/profile',
    loadComponent: () =>
      import('./features/auth/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/chat-list/chat-list.component').then(m => m.ChatListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:chatId',
    loadComponent: () =>
      import('./features/chat/chat-room/chat-room.component').then(m => m.ChatRoomComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
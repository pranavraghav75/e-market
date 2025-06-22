// src/app/app-routing.module.ts
import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }     from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../listings/listing-list/listing-list.component')
        .then(m => m.ListingListComponent)
  },
  {
    path: 'listings/:id',
    loadComponent: () =>
      import(
        '../listings/listing-detail/listing-detail.component'
      ).then(m => m.ListingDetailComponent)
  },
  {
    path: 'listings/new',
    loadComponent: () =>
      import(
        '../listings/listing-form/listing-form.component'
      ).then(m => m.ListingFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('../auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('../auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'auth/profile',
    loadComponent: () =>
      import('../auth/profile/profile.component')
        .then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('../chat/chat-list/chat-list.component')
        .then(m => m.ChatListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:chatId',
    loadComponent: () =>
      import('../chat/chat-room/chat-room.component')
        .then(m => m.ChatRoomComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
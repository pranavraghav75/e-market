import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AuthGuard }        from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '',         component: ChatListComponent, canActivate: [AuthGuard] },
  { path: ':chatId',  component: ChatRoomComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}

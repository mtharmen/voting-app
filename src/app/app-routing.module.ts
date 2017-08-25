import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { PollComponent } from './pages/poll/poll.component'
import { AdminComponent } from './pages/admin/admin.component'
import { NewPollComponent } from './pages/new-poll/new-poll.component'

import { AuthGuard } from './core/auth.guard'
import { AdminGuard } from './core/admin.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'poll/:id',
    component: PollComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard
  ]
})
export class AppRoutingModule { }

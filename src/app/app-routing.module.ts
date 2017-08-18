import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { StuffComponent } from './pages/stuff/stuff.component'
import { AdminComponent } from './pages/admin/admin.component'
import { SecretComponent } from './pages/secret.component'
import { NewStuffComponent } from './pages/new-stuff/new-stuff.component'
import { ErrorComponent } from './core/misc/error.component'

import { AuthGuard } from './core/auth.guard'
import { AdminGuard } from './core/admin.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'stuff',
    component: StuffComponent
  },
  {
    path: 'new-stuff',
    component: NewStuffComponent
  },
  {
    path: 'stuff/:id',
    component: StuffComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'secret',
    component: SecretComponent,
    // canActivate: [ AuthGuard ]
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

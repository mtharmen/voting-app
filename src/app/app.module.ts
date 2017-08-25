import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ApiService } from './core/api.service'
import { AuthService } from './core/auth.service'
import { ConfirmService } from './core/misc/confirm.service'
import { LoginFormService } from './pages/login-form/login-form.service'
import { ChartService } from './core/chart.service'

import { SearchFilterPipe } from './core/search-filter.pipe'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { LoadingComponent } from './core/misc/loading.component'
import { HomeComponent } from './pages/home/home.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { PollComponent } from './pages/poll/poll.component'
import { AdminComponent } from './pages/admin/admin.component'
import { LoginFormComponent } from './pages/login-form/login-form.component'
import { NewPollComponent } from './pages/new-poll/new-poll.component'
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { ConfirmComponent } from './core/misc/confirm.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { PollGridComponent } from './pages/poll-grid/poll-grid.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    PollComponent,
    AdminComponent,
    LoadingComponent,
    LoginFormComponent,
    NewPollComponent,
    UpdateFormComponent,
    ConfirmComponent,
    UserInfoComponent,
    PollGridComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    ApiService,
    LoginFormService,
    ConfirmService,
    ChartService
  ],
  entryComponents: [
    LoginFormComponent,
    ConfirmComponent,
    NewPollComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

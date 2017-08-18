import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ApiService } from './core/api.service'
import { AuthService } from './core/auth.service'
import { ConfirmService } from './core/misc/confirm.service'
import { ErrorService } from './core/misc/error.service'
import { LoginFormService } from './pages/login-form/login-form.service'
import { ChartService } from './pages/chart.service'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { LoadingComponent } from './core/misc/loading.component'
import { HomeComponent } from './pages/home/home.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { StuffComponent } from './pages/stuff/stuff.component'
import { AdminComponent } from './pages/admin/admin.component'
import { SecretComponent } from './pages/secret.component'
import { LoginFormComponent } from './pages/login-form/login-form.component'
import { NewStuffComponent } from './pages/new-stuff/new-stuff.component'
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { ConfirmComponent } from './core/misc/confirm.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { MyStuffComponent } from './pages/my-stuff/my-stuff.component';
import { ErrorComponent } from './core/misc/error.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    StuffComponent,
    AdminComponent,
    LoadingComponent,
    SecretComponent,
    LoginFormComponent,
    NewStuffComponent,
    UpdateFormComponent,
    ConfirmComponent,
    UserInfoComponent,
    MyStuffComponent,
    ErrorComponent
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
    ErrorService,
    ChartService
  ],
  entryComponents: [
    LoginFormComponent,
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

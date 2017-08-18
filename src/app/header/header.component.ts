import { Component } from '@angular/core'

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../core/auth.service'
import { LoginFormService } from './../pages/login-form/login-form.service'
import { LoginFormComponent } from './../pages/login-form/login-form.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  isCollapsed = true
  logoutSub: Subscription
  modalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false }

  constructor(
    public auth: AuthService,
    private modalService: NgbModal,
    private lf: LoginFormService
  ) { }

  open(): void {
    this.lf.setConnectStatus(false)
    const modal = this.modalService.open(LoginFormComponent, this.modalOptions)
    modal.result.then((result) => {
      if (result === 'Login Complete') {
        console.log('logged in')
      }
    }, (reason) => {
      console.log(reason)
    })
  }

  logout(): void {
    this.auth.logout()
  }
}

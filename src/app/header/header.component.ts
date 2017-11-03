import { Component } from '@angular/core'

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../core/auth.service'
import { LoginFormService } from './../pages/login-form/login-form.service'
import { LoginFormComponent } from './../pages/login-form/login-form.component'
import { NewPollComponent } from './../pages/new-poll/new-poll.component'

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

  login(): void {
    this.lf.setConnectStatus(false)
    const loginModal = this.modalService.open(LoginFormComponent, this.modalOptions)
    // loginModal.result.then(result => {
    //   if (result === 'Login Complete') {
    //     console.log('logged in')
    //   }
    // }, reason => {
    //   console.log(reason)
    // })
  }

  newPoll(): void {
    const newPollModal = this.modalService.open(NewPollComponent, this.modalOptions)
    newPollModal.result.then(id => {
      if (id) {
        this.auth.redirectTo('/poll/' + id)
      }
    })
    .catch(err => {
      if (err) {
        console.error(err)
      }
    })
  }

  logout(): void {
    this.auth.logout()
  }
}

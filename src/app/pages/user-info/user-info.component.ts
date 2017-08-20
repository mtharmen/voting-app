import { Component } from '@angular/core';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'

import { AuthService } from './../../core/auth.service'
import { ConfirmService } from './../../core/misc/confirm.service'

import { ConfirmComponent } from './../../core/misc/confirm.component'

import { LoginFormService } from './../login-form/login-form.service'
import { LoginFormComponent } from './../login-form/login-form.component'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent {

  modalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false }

  constructor(
    public auth: AuthService,
    private modalService: NgbModal,
    private lf: LoginFormService,
    private cf: ConfirmService
  ) { }

  connect(): void {
    if (this.auth.email) {
      // TODO: Broken, figure out how to carry over session with redirect
      this.cf.settings('Connect a Twitter Account?')
      localStorage.setItem('previous_tab', 'info')
      const twitterModal = this.modalService.open(ConfirmComponent)
      twitterModal.result.then(result => {
        this.auth.twitterConnect(this.auth.user_id)
      })
    } else {
      this.lf.setConnectStatus(true)
      const localModal = this.modalService.open(LoginFormComponent, this.modalOptions)
      localModal.result.then(result => {
        window.location.reload()
      })
    }
  }

  disconnect(): void {
    this.cf.settings('Disconnect your Twitter Account?')
    const modal = this.modalService.open(ConfirmComponent)
    modal.result.then(result => {
        this.auth.twitterDisconnect$()
          .subscribe(
            res => {
              console.log(res)
              this.auth.storeUserInfo(res)
            },
            err => {
              this.auth.setError(err)
            }
          )
      })
  }

}

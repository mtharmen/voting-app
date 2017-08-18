import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../../core/auth.service'
import { ApiService } from './../../core/api.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  getUsersSub: Subscription
  deleteUserSub: Subscription
  users: any[]

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.getUsersSub = this.api.getAllUsers$()
      .subscribe(
        res => {
          this.users = res
        },
        err => {
          this.api.setError(err)
        }
      )
  }

  deleteUser(id: string): void {
    const confirm = prompt('This will permenantly delete the user.\nEnter the id of the user to confirm:', '')
    if (confirm === id) {
      this.deleteUserSub = this.api
      .deleteUser$(id)
      .subscribe(
        res => {
          console.log(res)
          this.users = this.users.filter(user => {
            return user._id !== id
          })
        },
        err => {
          console.error(err)
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.getUsersSub.unsubscribe()
    if (this.deleteUserSub) {
      this.deleteUserSub.unsubscribe()
    }
  }

}

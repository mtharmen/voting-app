import { Component, OnInit } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { ApiService } from './../../core/api.service'
import { AuthService } from './../../core/auth.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit  {

  loading: boolean
  polls: any
  error: string
  allPollsSub: Subscription
  current: string
  local: boolean

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.current = localStorage.getItem('previous_tab') || 'my-stuff'
    localStorage.removeItem('previous_tab')
    this.local = !!this.auth.email
    this.getPolls()
  }

  getPolls() {
    this.loading = true
    this.allPollsSub = this.api.getAllPolls$(this.auth.user_id)
      .subscribe(
        res => {
          this.loading = false
          this.polls = res
        },
        err => {
          this.loading = false
          this.error = err
          console.error(err)
        }
      )
  }

  switch(val: string): void {
    this.current = val
    if (this.current !== 'my-stuff' && val === 'my-stuff') {
      this.getPolls()
    }
  }
}

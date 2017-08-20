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

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.current = localStorage.getItem('previous_tab') || 'my-stuff'
    localStorage.removeItem('previous_tab')
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
          console.log(err)
        }
      )
  }

  switch(val: string): void {
    this.current = val
  }
}

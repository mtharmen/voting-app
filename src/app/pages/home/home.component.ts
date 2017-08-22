import { Component, OnInit } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { ApiService } from './../../core/api.service'

// import Chart from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  loading: boolean
  polls: any
  error: string
  allPollsSub: Subscription

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.loading = true
    this.allPollsSub = this.api.getAllPolls$()
      .subscribe(
        res => {
          this.loading = false
          this.polls = res
        },
        err => {
          this.loading = false
          this.error = err
          this.api.setError(err)
        }
      )
  }

}

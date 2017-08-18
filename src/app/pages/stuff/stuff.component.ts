import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs/Subscription'

import { ApiService } from './../../core/api.service'
import { AuthService } from './../../core/auth.service'

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styles: []
})
export class StuffComponent implements OnInit, OnDestroy {

  stuffSub: Subscription
  routeSub: Subscription
  stuff: [string]
  loading: boolean
  id: string

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStuff()
    this.routeSub = this.route.paramMap
      .subscribe(params => {
        this.id = params.get('id')
      })
  }

  getStuff(): void {
    this.loading = true
    this.stuffSub = this.api
      .getStuff$()
      .subscribe(
        res => {
          this.stuff = res.stuff
        },
        err => {
          this.loading = false
          this.api.setError(err)
        }
      )
  }

  ngOnDestroy(): void {
    this.stuffSub.unsubscribe()
    this.routeSub.unsubscribe()
  }

}

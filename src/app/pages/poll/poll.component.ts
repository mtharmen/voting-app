import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs/Subscription'

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'

import { ApiService } from './../../core/api.service'
import { AuthService } from './../../core/auth.service'
import { ChartService } from './../../core/chart.service'
import { ConfirmService } from './../../core/misc/confirm.service'

import { ConfirmComponent } from './../../core/misc/confirm.component'

import { Poll } from './../../core/models/poll.model'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {

  @ViewChild('chart') chartRef: ElementRef
  chart: any
  pollSub: Subscription
  routeSub: Subscription
  deleteSub: Subscription
  voteSub: Subscription
  addOptionSub: Subscription
  poll: Poll
  pick: string
  edit: boolean
  duplicate: boolean
  voted: boolean
  show: boolean
  loading: boolean
  error: string

  newChoice = { newLabel: '' }
  modalOptions: NgbModalOptions = { backdrop: 'static', keyboard: false }

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private cs: ChartService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private confirm: ConfirmService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.routeSub = this.route.paramMap
      .subscribe(params => {
        this.getPoll(params.get('id'))
      })
  }

  private getPoll(id): void {
    this.loading = true
    this.pollSub = this.api
      .getPoll$(id)
      .subscribe(
        res => {
          this.poll = res
          // this.makeChart()
          this.loading = false
        },
        err => {
          this.loading = false
          if (err === 'No Poll Found' || err.indexOf('Cast to ObjectId') > -1) {
            this.error = 'No Poll Found'
          } else {
            this.api.setError(err)
          }
        }
      )
  }

  private makeChart(): void {
    const height = 64 + this.poll.data.length * 53
    this.chartRef.nativeElement.parentElement.style.height = height + 'px'
    this.show = true
    const ctx = this.chartRef.nativeElement.getContext('2d')
    this.chart = this.cs.makeChart(ctx, this.poll.data, this.poll.labels)
  }

  choose(choice): void {
    this.pick = choice
  }

  addNewChoice(): void {
    this.edit = true
    this.pick = ''
  }

  dupeCheck(): void {
    this.duplicate = false
    if (this.poll.labels.indexOf(this.newChoice.newLabel) > -1) {
      this.duplicate = true
    }
  }

  cancel(): void {
    this.edit = false
    this.newChoice.newLabel = ''
  }

  addData(): void {
    this.edit = false
    this.loading = true
    this.error = ''

    const newOption = this.newChoice.newLabel
    this.addOptionSub = this.api
      .addOption$(this.poll._id, newOption)
      .subscribe(
        res => {
          this.loading = false
          this.pick = newOption
          this.cs.addOption(this.chart, newOption)
        },
        err => {
          this.loading = false
          this.error = err
          console.error(err)
        }
      )
  }

  deletePoll() {
    this.confirm.settings(`Enter the name of this poll below to delete it`, this.poll.title)
    const modal = this.modalService.open(ConfirmComponent)
    modal.result.then(result => {
      this.deleteSub = this.api
        .deletePoll$(this.poll._id)
        .subscribe(
          res => {
            this.auth.redirectTo('/profile')
          },
          err => {
            console.error(err)
          }
        )
    })
  }

  vote() {
    this.error = ''
    this.loading = true
    const i = this.poll.labels.indexOf(this.pick)
    this.voteSub = this.api
      .voteOnPoll$(this.poll._id, i)
      .subscribe(
        res => {
          this.loading = false
          this.voted = true
          if (this.show) {
            this.cs.increment(this.chart, i)
          } else {
            this.makeChart()
          }
        },
        err => {
          this.loading = false
          console.error(err)
          this.error = err
        }
      )
  }

  ngOnDestroy(): void {
    this.pollSub.unsubscribe()
    this.routeSub.unsubscribe()
    if (this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }

}

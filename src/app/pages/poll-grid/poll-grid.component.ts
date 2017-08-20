import { Component, Input } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../../core/auth.service'
import { Poll } from './../../core/models/poll.model'

@Component({
  selector: 'app-poll-grid',
  templateUrl: './poll-grid.component.html',
  styles: []
})

export class PollGridComponent {

  @Input('polls') polls: Poll[]

  input = { search: '' }

  constructor(public auth: AuthService) { }

}


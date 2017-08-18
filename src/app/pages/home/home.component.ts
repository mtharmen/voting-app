import { Component } from '@angular/core'

import { AuthService } from './../../core/auth.service'

// import Chart from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthService) { }

}

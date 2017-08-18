import { Component, OnInit } from '@angular/core';

import { ErrorService } from './error.service'

@Component({
  selector: 'app-error',
  template: `
    <h1>{{errorCode}}</h1>
    <h2>{{errorMsg}}</h2>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  errorMsg: string
  errorCode: number

  constructor(private es: ErrorService) { }

  ngOnInit(): void {
    console.log(this.es.error)
    this.errorMsg = this.es.error.message || 'An Error has Occured'
    this.errorCode = this.es.error.statusCode || 500
  }

}

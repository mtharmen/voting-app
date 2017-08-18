import { Injectable } from '@angular/core'

@Injectable()
export class LoginFormService {

  connect: boolean

  constructor() { }

  setConnectStatus(val: boolean): void {
    this.connect = val
  }

}

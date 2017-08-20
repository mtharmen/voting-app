import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  error = {
    message: '',
    statusCode: undefined
  }

  constructor() { }

  setError(error): void {
    this.error = error
  }
}

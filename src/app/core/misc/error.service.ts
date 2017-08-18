import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  error: any

  constructor() { }

  setError(error): void {
    this.error = error
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

  prompt: string
  confirmName: string

  constructor() { }

  settings(prompt: string, confirmName?: string): void {
    this.prompt = prompt
    this.confirmName = confirmName
  }
}

import { Component, OnInit } from '@angular/core'

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { ConfirmService } from './confirm.service'

@Component({
  selector: 'app-confirm',
  template: `
    <div class="modal-body text-center">
      <h3>{{confirmObj.prompt}}</h3>
      <div *ngIf="confirmObj.name">
        <br>
        <input  type="text" class="form-control" [(ngModel)]="confirmObj.input" name="name">
      </div>
      <br>
      <button class="btn btn-success" (click)="confirm()" [disabled]="setDisable()">Confirm</button>
      <button class="btn btn-danger" (click)="cancel()">Cancel</button>
    </div>
  `,
  styles: []
})
export class ConfirmComponent implements OnInit {

  error: string
  confirmObj = {
    prompt: '',
    name: '',
    input: ''
  }

  constructor(
    private cf: ConfirmService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.confirmObj.prompt = this.cf.prompt
    this.confirmObj.name = this.cf.confirmName
  }

  setDisable(): boolean {
    return this.confirmObj.name && this.confirmObj.name !== this.confirmObj.input
  }

  confirm(): void {
    if (this.confirmObj.name) {
      if (this.confirmObj.name !== this.confirmObj.input) {
        this.error = 'Does not match'
        this.confirmObj.input = ''
        return
      }
    }
    this.cf.settings('', '')
    this.activeModal.close('Confirm')
  }

  cancel(): void {
    this.activeModal.dismiss('Cancel')
  }

}

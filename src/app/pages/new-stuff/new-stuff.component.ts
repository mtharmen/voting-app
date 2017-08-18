import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../../core/auth.service'
import { SignUpModel } from './../../core/models/signup.model'
import { DupeCheckValidator } from './../../core/validators/dupe-check.validator'


@Component({
  selector: 'app-new-stuff',
  templateUrl: './new-stuff.component.html'
})
export class NewStuffComponent implements OnInit, OnDestroy {

  newForm: FormGroup
  formErrors: any
  error: boolean
  submitting: boolean
  // minRequired: boolean
  optionsChangeSub: Subscription

  payLoad = ''

  constructor(private fb: FormBuilder) {  }

  ngOnInit(): void {
    // NOTE: maybe give the first two options the Validator.required rule
    const validators = [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
      DupeCheckValidator.dupeCheck
    ]
    const options = this.fb.array([
      ['', validators],
      ['', validators]
    ])
    this.newForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)
      ]],
      options: options
    })

    this.formErrors = this.newForm.controls

    // Subscribing to options to manually force update all fields for dupe check
    this.optionsChangeSub = this.options
      .valueChanges
      .debounceTime(500)
      .subscribe(data => this.onChange())
  }

  onChange(): void {
    // NOTE: Currently validates the changed value twice,
    //       but dupeCheck needs the current set of all values anyway
    const values = this.options.value
    values.forEach((elm, i) => {
      const stri = '' + i
      // don't emitEvent since .valueChanges will refire
      this.options.get(stri).updateValueAndValidity({ emitEvent: false })
    })

    // Manually check if there are two non-empty entries
    // const nonEmpty = values.filter(elm => elm)
    // this.minRequired = nonEmpty.length > 1 // ? '' : 'Need a minimum of two options'
  }

  get options(): FormArray {
    return this.newForm.get('options') as FormArray
  }

  addOption(): void {
    const newOption = this.fb.control('', [Validators.minLength(2), Validators.maxLength(12), DupeCheckValidator.dupeCheck])
    this.options.push(newOption)
  }

  removeOption(index: number): void {
    this.options.removeAt(index)
  }

  // TODO: Actually make this do something
  onSubmit(): void {
    this.error = false
    this.submitting = true
    setTimeout(() => {
      this.payLoad = JSON.stringify(this.newForm.value)
      this.submitting = false
      this.error = Math.random() > 0.5
    }, 1000)
  }

  ngOnDestroy(): void {
    this.optionsChangeSub.unsubscribe()
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../../core/auth.service'
import { ApiService } from './../../core/api.service'

import { PasswordValidator } from './../../core/validators/password-match.validator'
import { customPatternValidator } from './../../core/validators/custom-pattern.directive'
import { newValueValidator } from './../../core/validators/new-value.directive'
import { CustomRegExp } from './../../core/validators/custom-regexp'

// TODO: refactor to move update stuff outside of form
@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styles: [`
    .fake-pointer {
      cursor: pointer
    }
  `]
})
export class UpdateFormComponent implements OnInit, OnDestroy {

  updateForm: FormGroup
  defaultFirstName: string
  defaultLastName: string
  defaultEmail: string
  passwordChangeSub: Subscription
  formErrors: any
  submitSub: Subscription
  error: string
  success: boolean
  submitting: boolean

  current = 'Name'

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.updateForm =  this.fb.group({
      currentPassword: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })

    if (this.current === 'Name') {
      this.addFullName(this.updateForm)
      //this.updateForm.get('firstname').markAsDirty()
      //this.updateForm.get('lastname').markAsDirty()
    }

    if (this.current === 'Email') {
      this.addEmail(this.updateForm)
      //this.updateForm.get('email').markAsDirty()
    }

    // TODO: check if the values have changed from the defaults

    if (this.current === 'Password') {
      this.addNewPassword(this.updateForm)
      // To force validate and make both password fields match
      this.passwordChangeSub = this.updateForm.get('password')
        .valueChanges
        .subscribe(value => this.updateForm.get('password2').updateValueAndValidity())
    }
    this.formErrors = this.updateForm.controls
  }
  // TODO: messy, figure out how to only check for one new value
  // TODO: figure out how to mark fields with default value after submitting, but only after form is touched
  private addFullName(form: FormGroup): void {
    this.defaultFirstName = this.auth.fullname[0] || ''
    this.defaultLastName  = this.auth.fullname[1] || ''
    let validators = [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      customPatternValidator(/[^A-Za-z]/, 'nonLetter'),
      //newValueValidator(defaultFirstName)
    ]
    form.addControl('firstname', this.fb.control('', validators))

    validators = [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      customPatternValidator(/[^A-Za-z]/, 'nonLetter'),
      //newValueValidator(defaultLastName)
    ]
    form.addControl('lastname',  this.fb.control('', validators))
  }

  private addEmail(form: FormGroup): void {
    this.defaultEmail = this.auth.email || ''
    const validators = [
      Validators.required,
      customPatternValidator(CustomRegExp.email, 'invalidEmail'),
      //newValueValidator(defaultEmail)
    ]
    form.addControl('email', this.fb.control('', validators))
  }

  private addNewPassword(form: FormGroup): void {
    form.addControl('password', this.fb.control('', [ Validators.required, Validators.minLength(5) ]))
    form.addControl('password2', this.fb.control('', [Validators.required, PasswordValidator.notMatch ]))
  }

  onSubmit(): void {
    this.submitting = true
    this.error = null
    this.success = false

    const userInfo: { [key: string]: any } = {}
    userInfo.currentPassword = this.updateForm.get('currentPassword').value

    if (this.current === 'Name') {
      userInfo.firstname = this.updateForm.get('firstname').value
      userInfo.lastname = this.updateForm.get('lastname').value
    }

    if (this.current === 'Email') {
      userInfo.email = this.updateForm.get('email').value
    }

    if (this.current === 'Password') {
      userInfo.newPassword = this.updateForm.get('password').value
    }

    this.submitSub = this.api
      .updateInfo$(userInfo, this.current)
      .subscribe(
        res => {
          this.submitting = false
          this.success = true
          this.auth.storeUserInfo(res)
          this.resetFields()
        },
        err => {
          this.error = err,
          this.submitting = false
          this.resetFields()
        }
      )
  }

  resetFields(): void {
    this.updateForm.get('currentPassword').reset()
    if (this.current === 'Password') {
      this.updateForm.get('password').reset()
      this.updateForm.get('password2').reset()
    }
  }

  switch(val: string): void {
    if (this.current !== val) {
      this.current = val
      this.error = null
      this.success = false
      if (this.passwordChangeSub) {
        this.passwordChangeSub.unsubscribe()
      }
      // NOTE: Could add/remove inputs instead of rebuilding for each time
      //       But need to remove values anyway
      this.buildForm()
    }
  }

  showErrors(field: string): boolean {
    return !this.formErrors[field].valid && (this.formErrors[field].dirty || this.formErrors[field].touched)
  }

  ngOnDestroy(): void {
    if (this.submitSub) {
      this.submitSub.unsubscribe()
    }
    if (this.passwordChangeSub) {
      this.passwordChangeSub.unsubscribe()
    }
  }
}

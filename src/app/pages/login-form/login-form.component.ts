import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './../../core/auth.service'
import { LoginFormService } from './login-form.service'
import { SignUpModel } from './../../core/models/signup.model'

import { PasswordValidator } from './../../core/validators/password-match.validator'
import { customPatternValidator } from './../../core/validators/custom-pattern.directive'
import { CustomRegExp } from './../../core/validators/custom-regexp'

// TODO: refactor to move modal elements into its own service
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [`
    .fake-pointer {
        cursor: pointer;
        user-select: none;
    }
  `]
})
export class LoginFormComponent implements OnInit, OnDestroy {

  loginForm: FormGroup
  passwordChangeSub: Subscription
  formErrors: any
  userInfo: SignUpModel
  submitLoginSub: Subscription
  error: string
  submitting: boolean
  signup: boolean

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public lf: LoginFormService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.loginForm =  this.fb.group({
      email: ['', [
        Validators.required,
        customPatternValidator(CustomRegExp.email, 'invalidEmail')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })

    if (this.signup) {
      this.loginForm.addControl('username',
        this.fb.control('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
          customPatternValidator(CustomRegExp.username, 'invalidChar')
        ])
      )
      this.loginForm.addControl('password2',
        this.fb.control('', [
          Validators.required,
          PasswordValidator.notMatch
        ])
      )
      // Force validate password2 when password changes
      this.passwordChangeSub = this.loginForm.get('password')
        .valueChanges
        .subscribe(value => this.loginForm.get('password2').updateValueAndValidity())
    }
    this.formErrors = this.loginForm.controls
  }

  onSubmit(): void {
    this.submitting = true
    this.error = null

    const email = this.loginForm.get('email').value
    const username = this.signup ? this.loginForm.get('username').value : undefined
    const password = this.loginForm.get('password').value

    this.userInfo = new SignUpModel( email, password, username )
    let logSign
    if (this.lf.connect) {
      logSign = 'localConnect$'
    } else {
      logSign = this.signup ? 'localSignUp$' : 'localLogin$'
    }

    this.submitLoginSub = this.auth
      [logSign](this.userInfo)
      .subscribe(
        res => {
          this.submitting = false
          this.auth.storeUserInfo(res)
          this.activeModal.close('Login Complete')
        },
        err => {
          this.error = err,
          this.submitting = false
        }
      )
  }

  twitterLogin(): void {
    const loginType = this.lf.connect ? 'twitterConnect$' : 'twitterLogin'
    this.auth[loginType]()
  }

  switch(val: boolean): void {
    if (this.signup !== val) {
      this.signup = val
      this.error = null
      if (this.submitLoginSub) {
        this.submitLoginSub.unsubscribe()
      }
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

  close(): void {
    if (!this.submitting) {
      this.activeModal.dismiss('Cross click')
    }
  }

  get buttonText(): string {
    return this.signup ? 'Sign Up' : 'Login'
  }

  ngOnDestroy(): void {
    if (this.submitLoginSub) {
      this.submitLoginSub.unsubscribe()
    }
    if (this.passwordChangeSub) {
      this.passwordChangeSub.unsubscribe()
    }
  }
}

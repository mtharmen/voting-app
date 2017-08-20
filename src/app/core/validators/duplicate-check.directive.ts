import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms'

// TODO: Merge with dupe-check.validator
export function duplicateCheckFactory(existingChoicesString: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    // NOTE: only accepts strings? so turn list in of choices into string joined by '|'
    const existingChoices = existingChoicesString.split('|')
    return existingChoices.indexOf(control.value) > -1 && control.value
      ? { 'dupeCheck': { value: control.value } } 
      : null
  }
}

@Directive({
  selector: '[dupeCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DuplicateCheckValidatorDirective, multi: true }]
})
export class DuplicateCheckValidatorDirective implements Validator {
  @Input() dupeCheck: string
 
  validate(control: AbstractControl): {[key: string]: any} {
    return this.dupeCheck 
      ? duplicateCheckFactory(this.dupeCheck)(control)
      : null
  }
}
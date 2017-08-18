//https://angular.io/guide/form-validation
import { ValidatorFn, AbstractControl } from '@angular/forms'

export function customPatternValidator(pattern: RegExp, label: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const error = {}
    error[label] = { value: control.value }
    return pattern.test(control.value) && control.value ? error : null
  }
}

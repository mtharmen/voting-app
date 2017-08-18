//https://angular.io/guide/form-validation
import { ValidatorFn, AbstractControl } from '@angular/forms'

export function newValueValidator(original: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const error = { 'notNew': { value: control.value } }
    // Don't bother setting error if either original or the value inside are empty
    return original && control.value && original === control.value ? error : null
  }
}

// From https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
import {AbstractControl} from '@angular/forms'

export class PasswordValidator {
    static notMatch(control: AbstractControl): { [key: string]: any } {
        const password2 = control.value
        const parent = control.parent
        // NOTE: Validators are triggered when , so when parent doesn't exist?
        if (parent) {
            const password = parent.get('password').value
            if (password2 !== password) {
                return password2 ? { notMatch: true } : null
            }
        }
        return null
    }
}

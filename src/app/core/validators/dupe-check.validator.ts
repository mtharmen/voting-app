import { AbstractControl } from '@angular/forms'

export class DupeCheckValidator {
    static dupeCheck(control: AbstractControl): { [key: string]: any } {
      // NOTE: why does this fire three times per input on load?
      const value = control.value
      const optionsGroup = control.parent
      // To prevent calling .value on null since it fires on instantiation when optionsGroup has no parent
      if (optionsGroup && value) {
        const options = optionsGroup.value
        const dupes = options.filter(elm => elm === value)
        return dupes.length > 1 && !control.errors ? { dupeCheck: true } : null
      }
      return null
    }
}

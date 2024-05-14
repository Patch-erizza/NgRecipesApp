import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function arrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }
    if (!Array.isArray(value)) {
      return null;
    }
    if (value.length <= minLength) {
      return {arrayMinLength: true}
    }
    return null;
  }
}

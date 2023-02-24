import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RutService } from 'rut-chileno'

export default class Validation {
  constructor(private rutService: RutService) {}

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static validRut () : ValidatorFn {
    const rutService: RutService = new RutService();
    return (controls: AbstractControl) => {
      const control = controls.get('rut');
      if (control?.value?.length && rutService.validaRUT(control?.value)) {
        control?.setErrors({ valid: true });
        return { valid: true };
      }

      return null;
    };
  }
}

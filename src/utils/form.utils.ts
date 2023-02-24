import { AbstractControl, FormGroup } from '@angular/forms';

export default class FormUtils {
  static resetForm(form: FormGroup, f: {
    [key: string]: AbstractControl<any, any>;
  }) {
    for(var name in form.controls) {
      f[name].setValue('');
      f[name].setErrors(null);
    }
  }

  static checkEmpty(form: FormGroup, f: {
    [key: string]: AbstractControl<any, any>;
  }) {
    for(var name in form.controls) {
      if (f[name].value === '') {
        f[name].setValue(null);
      }
    }
  }
}

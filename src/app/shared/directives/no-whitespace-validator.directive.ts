import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhiteSpaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const isWhiteSpace = (control.value || '').includes(' ');
  return isWhiteSpace ? { whitespace: true } : null;
}

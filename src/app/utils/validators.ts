import { AbstractControl } from '@angular/forms';
import { calculateAge } from './helpers';

export const minAge = 14;
export const maxAge = 100;

export const birthdateValidator = () => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null;
    }

    const age = calculateAge(control.value);

    if (age < minAge) {
      return { minAgeError: true };
    } else if (age > maxAge) {
      return { maxAgeError: true };
    }

    return null;
  };
};

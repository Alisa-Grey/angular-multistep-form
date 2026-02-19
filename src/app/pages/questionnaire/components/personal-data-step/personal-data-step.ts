import { Component, inject, Input } from '@angular/core';
import { StepsService } from '../../../../services/questionnaire-steps';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { capitalizeString } from '../../../../utils/transformers';

@Component({
  selector: 'app-personal-data-step',
  imports: [ReactiveFormsModule],
  templateUrl: './personal-data-step.html',
})
export class PersonalDataStep {
  stepsService = inject(StepsService);

  @Input() parentForm!: FormGroup;
  form!: FormGroup;

  ngOnInit() {
    this.form = this.parentForm.get('personalData') as FormGroup;

    this.firstName?.valueChanges.subscribe((value) => {
      if (value) {
        const transformedValue = capitalizeString(value.trim());
        this.firstName?.setValue(transformedValue, { emitEvent: false });
      }
    });

    this.lastName?.valueChanges.subscribe((value) => {
      if (value) {
        const transformedValue = capitalizeString(value.trim());
        this.lastName?.setValue(transformedValue, { emitEvent: false });
      }
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }
}

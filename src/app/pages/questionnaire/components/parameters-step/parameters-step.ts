import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StepsService } from '../../../../services/questionnaire-steps';

@Component({
  selector: 'app-parameters-step',
  imports: [ReactiveFormsModule],
  templateUrl: './parameters-step.html',
  styleUrl: './parameters-step.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ParametersStep {
  stepsService = inject(StepsService);

  @Input() parentForm!: FormGroup;
  form!: FormGroup;

  ngOnInit() {
    this.form = this.parentForm.get('parameters') as FormGroup;
  }

  get height() {
    return this.form.get('height');
  }

  get weight() {
    return this.form.get('weight');
  }
}

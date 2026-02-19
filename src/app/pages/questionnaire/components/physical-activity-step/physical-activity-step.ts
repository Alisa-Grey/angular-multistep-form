import { Component, inject, Input } from '@angular/core';
import { StepsService } from '../../../../services/questionnaire-steps';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { physicalActivityOptions } from '../../../../utils/stepsData';

@Component({
  selector: 'app-physical-activity-step',
  imports: [ReactiveFormsModule],
  templateUrl: './physical-activity-step.html',
  styleUrl: './physical-activity-step.scss',
})
export class PhysicalActivityStep {
  stepsService = inject(StepsService);

  @Input() parentForm!: FormGroup;
  form!: FormGroup;

  options = physicalActivityOptions;

  ngOnInit() {
    this.form = this.parentForm.get('physicalActivity') as FormGroup;
  }
}

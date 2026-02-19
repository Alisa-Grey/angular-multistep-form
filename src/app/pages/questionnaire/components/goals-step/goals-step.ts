import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { StepsService } from '../../../../services/questionnaire-steps';
import { IGoal } from './goals-step.interface';
import { goals } from '../../../../utils/stepsData';

@Component({
  selector: 'app-goals-step',
  imports: [ReactiveFormsModule],
  templateUrl: './goals-step.html',
  styleUrl: './goals-step.scss',
})
export class GoalsStep {
  stepsService = inject(StepsService);
  formBuilder = inject(FormBuilder);

  @Input() parentForm!: FormGroup;

  goals: IGoal[] = goals;

  get goalsArray(): FormArray<FormControl<boolean>> {
    return this.parentForm.get('goals') as FormArray<FormControl<boolean>>;
  }

  ngOnInit() {
    if (!this.parentForm.get('goals')) {
      this.parentForm.addControl(
        'goals',
        this.formBuilder.array(this.goals.map(() => this.formBuilder.control<boolean>(false)))
      );
    }
  }
}

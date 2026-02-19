import { Component, effect, inject, signal } from '@angular/core';
import { ParametersStep } from './components/parameters-step/parameters-step';
import { StepsService } from '../../services/questionnaire-steps';
import { IStep, StepIds } from '../../services/questionnaire-step.interface';
import { SvgIcon } from '../../components/svg-icon/svg-icon';
import { PhysicalActivityStep } from './components/physical-activity-step/physical-activity-step';
import { PersonalDataStep } from './components/personal-data-step/personal-data-step';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoalsStep } from './components/goals-step/goals-step';
import { GoalsIds, IGoal } from './components/goals-step/goals-step.interface';
import { goals } from '../../utils/stepsData';
import { birthdateValidator } from '../../utils/validators';
import { LocalStorageService } from '../../services/local-storage';
import { Router } from '@angular/router';
import { BmiPopup } from '../../components/bmi-popup/bmi-popup';
import { BmiPopupVariants } from '../../interfaces/enums';

@Component({
  selector: 'app-questionnaire',
  imports: [
    ReactiveFormsModule,
    ParametersStep,
    SvgIcon,
    PhysicalActivityStep,
    PersonalDataStep,
    GoalsStep,
    BmiPopup,
  ],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire {
  stepsService = inject(StepsService);
  formBuilder = inject(FormBuilder);
  localStorageService = inject(LocalStorageService);
  router = inject(Router);

  questionnaireForm!: FormGroup;
  step: IStep = {} as IStep;
  stepsList = this.stepsService.steps;
  goals: IGoal[] = goals;
  goalIds = this.goals.map((goal) => goal.id);

  popupVariant = signal<BmiPopupVariants | null>(null);

  constructor() {
    effect(() => {
      this.step = this.stepsService.currentStep();
    });
  }

  ngOnInit() {
    this.questionnaireForm = this.formBuilder.group({
      parameters: this.formBuilder.group({
        height: [null, [Validators.required, Validators.min(100), Validators.max(250)]],
        weight: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
      }),
      physicalActivity: this.formBuilder.group({
        physicalActivity: ['', Validators.required],
      }),
      personalData: this.formBuilder.group({
        firstName: [
          '',
          {
            validators: [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\-]{2,25}$/)],
            updateOn: 'blur',
          },
        ],
        lastName: [
          '',
          { validators: [Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\-]{2,25}$/)], updateOn: 'blur' },
        ],
        birthdate: ['', [Validators.required, birthdateValidator()]],
      }),
      goals: this.formBuilder.array(this.goals.map(() => this.formBuilder.control<boolean>(false))),
    });
  }

  handleNext() {
    if (this.step.semanticId === StepIds.parametersStep) {
      const formValue = this.questionnaireForm.value.parameters;
      const BMI = +(formValue.weight / Math.pow(formValue.height / 100, 2)).toFixed(1);
      if (BMI < 15) {
        this.popupVariant.set(BmiPopupVariants.underweight);
        return;
      } else if (BMI >= 30) {
        this.popupVariant.set(BmiPopupVariants.overweight);
        return;
      } else {
        this.popupVariant.set(null);
      }
    }
    console.log('popupVariant', this.popupVariant);
    this.stepsService.goToNextStep();
  }

  submitForm() {
    if (this.questionnaireForm.valid) {
      const { parameters, physicalActivity, personalData, goals } = this.questionnaireForm.value;

      const selectedGoalIds: GoalsIds[] = goals
        .map((checked: boolean, i: number) => (checked ? this.goalIds[i] : null))
        .filter((v: GoalsIds | null) => v !== null);

      this.localStorageService.setItem('user', {
        ...parameters,
        ...personalData,
        ...physicalActivity,
        goals: selectedGoalIds,
      });

      this.stepsService.currentStep.set(this.stepsList[0]);
      this.router.navigate(['/profile']);
    }
  }
}

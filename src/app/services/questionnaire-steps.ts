import { Injectable, signal } from '@angular/core';
import { StepIds } from './questionnaire-step.interface';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  steps = [
    { id: 0, semanticId: StepIds.parametersStep, title: 'Ваши параметры' },
    {
      id: 1,
      semanticId: StepIds.physicalActivityStep,
      title: 'Ваша физическая активность',
    },
    { id: 2, semanticId: StepIds.personalDataStep, title: 'Личные данные' },
    { id: 3, semanticId: StepIds.goals, title: 'Ваши цели' },
  ];

  currentStep = signal(this.steps[0]);

  goToPrevStep() {
    if (this.currentStep().id === 0) {
      return;
    }
    const prevStep = this.steps.find((step) => step.id === this.currentStep().id - 1);
    this.currentStep.set(prevStep ?? this.steps[0]);
  }

  goToNextStep() {
    if (this.currentStep().id === this.steps.length) {
      return;
    }
    const nextStep = this.steps.find((step) => step.id === this.currentStep().id + 1);
    this.currentStep.set(nextStep ?? this.steps[0]);
  }
}

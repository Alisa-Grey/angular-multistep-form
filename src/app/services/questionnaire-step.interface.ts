export enum StepIds {
  parametersStep = 'parameters',
  physicalActivityStep = 'physicalActivity',
  goals = 'goals',
  personalDataStep = 'personalData',
  finalStep = 'finalStep',
}

export interface IStep {
  id: number;
  semanticId: string;
  title: string;
}

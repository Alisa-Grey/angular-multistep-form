import { IGoal, GoalsIds } from '../pages/questionnaire/components/goals-step/goals-step.interface';
import {
  IPhysicalActivityItem,
  PhysicalActivityIds,
} from '../pages/questionnaire/components/physical-activity-step/physical-activity-step.interface';

export const physicalActivityOptions: IPhysicalActivityItem[] = [
  { id: PhysicalActivityIds.miminal, title: 'Минимальная', description: 'Обычный образ жизни' },
  { id: PhysicalActivityIds.normal, title: 'Нормальная', description: 'Активный образ жизни' },
  { id: PhysicalActivityIds.high, title: 'Высокая', description: 'Набор мышечной массы' },
  { id: PhysicalActivityIds.sport, title: 'Спортивная', description: 'Ежедневные тренировки' },
];

export const goals: IGoal[] = [
  { id: GoalsIds.diary, title: 'Вести дневник' },
  { id: GoalsIds.findFriends, title: 'Найти друзей' },
  { id: GoalsIds.findSpecialist, title: 'Получить помощь специалиста' },
  { id: GoalsIds.other, title: 'Другое' },
  { id: GoalsIds.nolon, title: 'нолон, отцепись, пожалуйста' },
];

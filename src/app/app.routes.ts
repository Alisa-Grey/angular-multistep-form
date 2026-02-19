import { Routes } from '@angular/router';
import { Questionnaire } from './pages/questionnaire/questionnaire';
import { Layout } from './components/layout/layout';
import { Profile } from './pages/profile/profile';
import { Experts } from './pages/experts/experts';
import { accessGuard } from './guards/access-guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'questionnaire',
        pathMatch: 'full',
      },
      {
        path: 'questionnaire',
        component: Questionnaire,
      },
      {
        path: 'profile',
        component: Profile,
        canActivate: [accessGuard],
      },
      {
        path: 'experts',
        component: Experts,
        canActivate: [accessGuard],
      },
    ],
  },
];

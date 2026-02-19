import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage';
import { isPlatformBrowser } from '@angular/common';

export const accessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const user = localStorageService.getItem('user');

  if (user) {
    return true;
  }

  return router.parseUrl('/questionnaire');
};

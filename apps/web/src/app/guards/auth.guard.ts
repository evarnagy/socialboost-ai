import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { auth } from '../firebase';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);

  // ha már van user, ok
  if (auth.currentUser) return true;

  // várunk 1x auth state-re (különben onboardingnál néha null)
  const user = await new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged((u) => {
      unsub();
      resolve(u);
    });
  });

  if (user) return true;

  router.navigateByUrl('/login');
  return false;
};

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = 
[ 
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'onboarding', loadComponent: () => import('./pages/onboarding/onboarding').then(m => m.Onboarding), canActivate: [authGuard] },
  { path: 'ideas', loadComponent: () => import('./pages/ideas/ideas').then(m => m.Ideas), canActivate: [authGuard] },
  { path: 'library', loadComponent: () => import('./pages/library/library').then(m => m.Library), canActivate: [authGuard] },
  { path: 'planner', loadComponent: () => import('./pages/planner/planner').then(m => m.Planner), canActivate: [authGuard] },
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: '**', redirectTo: '' },

];
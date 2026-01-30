import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Onboarding } from './pages/onboarding/onboarding';
import { Ideas } from './pages/ideas/ideas';
import { Library } from './pages/library/library';
import { Planner } from './pages/planner/planner';
import { authGuard } from './guards/auth.guard';
import { Home } from './pages/home/home';


export const routes: Routes = 
[ 
  { path: 'login', component: Login },
  { path: 'onboarding', component: Onboarding, canActivate: [authGuard] },
  { path: 'ideas', component: Ideas, canActivate: [authGuard] },
  { path: 'library', component: Library, canActivate: [authGuard] },
  { path: 'planner', component: Planner, canActivate: [authGuard] },
  { path: '', component: Home },
  { path: '**', redirectTo: '' },

];
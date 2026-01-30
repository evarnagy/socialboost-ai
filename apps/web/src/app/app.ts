import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app">
      <header class="topbar">
        <div class="brand">SocialBoost AI</div>
        <nav *ngIf="user" class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/ideas" routerLinkActive="active">Ötletek</a>
          <a routerLink="/library" routerLinkActive="active">Könyvtár</a>
          <a routerLink="/planner" routerLinkActive="active">Tervező</a>
          <a routerLink="/onboarding" routerLinkActive="active">Profilom</a>
          <button class="btn secondary" (click)="logout()">Kilépés</button>
        </nav>

        <nav *ngIf="!user" class="nav">
          <a routerLink="/login" routerLinkActive="active">Bejelentkezés</a>
        </nav>
      </header>

      <main class="container">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .topbar{
      position: sticky; top:0; z-index:10;
      display:flex; justify-content:space-between; align-items:center;
      padding: 12px 16px; border-bottom: 1px solid #eee; background:#fff;
    }
    .brand{ font-weight:700; }
    .nav{ display:flex; gap:12px; }
    .nav a{ text-decoration:none; padding:6px 10px; border-radius:10px; color:#333; }
    .nav a.active{ background:#f2f2f2; }
    .container{ max-width: 720px; margin: 0 auto; padding: 16px; }
  `]
})
export class App {
  user: any = null;

  constructor(private router: Router) {
    auth.onAuthStateChanged((u) => {
      this.user = u;
    });
  }

  async logout() {
    try {
      await signOut(auth);
      this.router.navigateByUrl('/login');
    } catch (e) {
      console.error('Logout failed', e);
    }
  }
}

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
    <div class="app" [class.guest]="!user">
      <aside class="sidebar" *ngIf="user">
        <div class="brandWrap">
          <div class="brandMark">SB</div>
          <div>
            <div class="brand">SocialBoost AI</div>
            <p class="muted">Creator Studio</p>
          </div>
        </div>

        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/ideas" routerLinkActive="active">Ötletek</a>
          <a routerLink="/library" routerLinkActive="active">Könyvtár</a>
          <a routerLink="/planner" routerLinkActive="active">Tervező</a>
          <a routerLink="/onboarding" routerLinkActive="active">Profilom</a>
        </nav>

        <button class="btn secondary logoutBtn" (click)="logout()">Kilépés</button>
      </aside>

      <div class="contentWrap">
        <header class="topbar">
          <div class="topbarText">
            <h1>{{ user ? 'Dashboard' : 'Üdv a SocialBoost AI-ban' }}</h1>
            <p class="muted">Gyorsabb tervezés, jobb posztok, egy helyen.</p>
          </div>

          <nav *ngIf="!user" class="guestNav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
            <a routerLink="/login" routerLinkActive="active">Bejelentkezés</a>
          </nav>
        </header>

        <main class="container page-enter">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 20px;
      padding: 20px;
    }

    .app.guest {
      grid-template-columns: 1fr;
      max-width: 1240px;
      margin: 0 auto;
    }

    .sidebar {
      position: sticky;
      top: 20px;
      align-self: start;
      height: calc(100vh - 40px);
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 18px;
      border-radius: 24px;
      border: 1px solid var(--border-soft);
      background: rgba(255, 255, 255, 0.84);
      box-shadow: var(--shadow-md);
    }

    .brandWrap {
      display: flex;
      gap: 12px;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-soft);
    }

    .brandMark {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      color: #fff;
      font-weight: 800;
      font-size: 13px;
      background: linear-gradient(145deg, var(--brand-500), var(--brand-700));
    }

    .brand {
      font-family: 'Bahnschrift', 'Segoe UI Semibold', 'Segoe UI', sans-serif;
      font-weight: 700;
      color: var(--text-strong);
    }

    .nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .nav a,
    .guestNav a {
      text-decoration: none;
      color: var(--text-main);
      border-radius: 12px;
      padding: 10px 12px;
      border: 1px solid transparent;
      font-weight: 600;
      transition: background 120ms ease, border-color 120ms ease;
    }

    .nav a.active,
    .guestNav a.active {
      background: var(--surface-1);
      border-color: var(--border-soft);
      box-shadow: var(--shadow-sm);
    }

    .logoutBtn {
      margin-top: auto;
    }

    .contentWrap {
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .app.guest .contentWrap {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 8;
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 16px;
      padding: 12px 6px 16px;
    }

    .app.guest .topbar {
      padding-inline: 2px;
      justify-content: space-between;
    }

    .topbarText h1 {
      font-size: clamp(24px, 3vw, 34px);
      margin-bottom: 4px;
    }

    .guestNav {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .container {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      padding: 0;
    }

    .app.guest .container {
      max-width: 1160px;
    }

    @media (max-width: 1024px) {
      .app {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .app.guest {
        max-width: 100%;
      }

      .sidebar {
        position: static;
        height: auto;
      }

      .nav {
        flex-direction: row;
        flex-wrap: wrap;
      }

      .logoutBtn {
        margin-top: 4px;
      }
    }

    @media (max-width: 680px) {
      .app {
        padding: 12px;
      }

      .sidebar {
        padding: 14px;
      }

      .topbar {
        align-items: start;
        flex-direction: column;
      }

      .app.guest .topbar {
        align-items: start;
      }
    }
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

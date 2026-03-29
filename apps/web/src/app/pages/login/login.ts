import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { LoginHeader } from './login-header/login-header';
import { LOGIN_HEADER } from './login-header/login-header-data';
import { LoginForm } from './login-form/login-form';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginHeader, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;
  loginHeaderData = LOGIN_HEADER;

  constructor(private auth: AuthService, private router: Router, private profileService: ProfileService) {}

  private authErrorMessage(e: any): string {
    const code: string = e?.code ?? '';
    const messages: Record<string, string> = {
      'auth/invalid-credential':    'Hibás e-mail cím vagy jelszó.',
      'auth/user-not-found':        'Nem található ilyen felhasználó.',
      'auth/wrong-password':        'Hibás jelszó.',
      'auth/invalid-email':         'Érvénytelen e-mail cím.',
      'auth/email-already-in-use':  'Ez az e-mail cím már foglalt.',
      'auth/weak-password':         'A jelszó túl rövid (min. 6 karakter).',
      'auth/too-many-requests':     'Túl sok próbálkozás. Próbáld újra később.',
      'auth/network-request-failed':'Hálózati hiba. Ellenőrizd az internetkapcsolatot.',
    };
    return messages[code] ?? 'Hiba történt. Próbáld újra.';
  }

  async onLogin() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      const p = await this.profileService.getProfile();
      await this.router.navigateByUrl(p ? '/ideas' : '/onboarding');
    } catch (e: any) {
      this.error = this.authErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  async onRegister() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.register(this.email, this.password);
      const p = await this.profileService.getProfile();
      await this.router.navigateByUrl(p ? '/ideas' : '/onboarding');
    } catch (e: any) {
      this.error = this.authErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }
}

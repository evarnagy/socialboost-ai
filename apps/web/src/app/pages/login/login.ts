import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router, private profileService: ProfileService) {}
  async onLogin() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      const p = await this.profileService.getProfile();
await this.router.navigateByUrl(p ? '/ideas' : '/onboarding');

    } catch (e: any) {
      this.error = e?.message ?? 'Login hiba';
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
      this.error = e?.message ?? 'Regisztráció hiba';
    } finally {
      this.loading = false;
    }
  }
}

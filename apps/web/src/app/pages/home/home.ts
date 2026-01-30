import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private auth: AuthService, private router: Router) {}

  start() {
    if (this.auth.user) {
      alert('Már be vagyunk jelentkezve 🙂');
    } else {
      this.router.navigate(['/login']);
    }
  }
}

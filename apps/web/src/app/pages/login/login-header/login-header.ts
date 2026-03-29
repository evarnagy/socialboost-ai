import { Component, Input } from '@angular/core';
import { LoginHeaderData } from './login-header-data';

@Component({
  selector: 'app-login-header',
  standalone: true,
  imports: [],
  templateUrl: './login-header.html',
  styleUrl: './login-header.css'
})
export class LoginHeader {
  @Input() data!: LoginHeaderData;
}

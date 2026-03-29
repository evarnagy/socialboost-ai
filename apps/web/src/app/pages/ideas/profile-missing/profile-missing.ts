import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMissingData } from './profile-missing-data';

@Component({
  selector: 'app-profile-missing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-missing.html',
  styleUrl: './profile-missing.css',
})
export class ProfileMissing {
  @Input() data!: ProfileMissingData;
  @Input() error = '';
  @Output() createProfile = new EventEmitter<void>();

  onClick() {
    this.createProfile.emit();
  }
}
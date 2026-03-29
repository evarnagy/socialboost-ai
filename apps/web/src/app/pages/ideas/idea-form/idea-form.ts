import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToneType, TONE_OPTIONS } from './idea-form-data';

@Component({
  selector: 'app-idea-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idea-form.html',
  styleUrl: './idea-form.css',
})
export class IdeaForm {
  @Input() industry = '';
  @Input() targetAudience = '';
  @Input() tone: ToneType = 'friendly';
  @Input() loading = false;
  @Input() error = '';
  @Output() industryChange = new EventEmitter<string>();
  @Output() audienceChange = new EventEmitter<string>();
  @Output() toneChange = new EventEmitter<ToneType>();
  @Output() generateIdeas = new EventEmitter<void>();
  @Output() generatePost = new EventEmitter<void>();

  toneOptions = TONE_OPTIONS;

  onGenerate() {
    this.generateIdeas.emit();
  }

  onGeneratePost() {
    this.generatePost.emit();
  }

  isFormValid(): boolean {
    return this.industry.trim() !== '' && this.targetAudience.trim() !== '';
  }
}
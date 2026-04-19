import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToneType, TONE_OPTIONS } from './idea-form-data';

@Component({
  selector: 'app-idea-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './idea-form.html',
  styleUrl: './idea-form.css',
})
export class IdeaForm {
  @Input() industry = '';
  @Input() targetAudience = '';
  @Input() tone: ToneType = 'friendly';
  @Input() loading = false;
  @Input() error = '';
  @Output() generateIdeas = new EventEmitter<void>();
  @Output() generatePost = new EventEmitter<void>();

  get toneLabel(): string {
    return TONE_OPTIONS.find(o => o.value === this.tone)?.label ?? this.tone;
  }

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
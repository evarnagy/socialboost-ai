import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CtaButton } from './cta-row-data';

@Component({
  selector: 'app-cta-row',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cta-row.html',
  styleUrl: './cta-row.css',
})
export class CtaRow {
  @Input() buttons!: CtaButton[];
  @Output() buttonClick = new EventEmitter<string>();

  onClick(button: CtaButton) {
    if (button.isClick) {
      this.buttonClick.emit(button.text);
    }
  }
}
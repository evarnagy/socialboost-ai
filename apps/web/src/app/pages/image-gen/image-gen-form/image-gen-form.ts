import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageStyle, ImageSize, IMAGE_STYLE_OPTIONS, IMAGE_SIZE_OPTIONS } from './image-gen-form-data';


@Component({
  selector: 'app-image-gen-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-gen-form.html',
  styleUrl: './image-gen-form.css',
})
export class ImageGenForm {
  @Input() industry = '';
  @Input() targetAudience = '';
  @Input() style: ImageStyle = 'photorealistic';
  @Input() size: ImageSize = '1024x1024';
  @Input() loading = false;
  @Input() error = '';

  @Output() styleChange = new EventEmitter<ImageStyle>();
  @Output() sizeChange = new EventEmitter<ImageSize>();
  @Output() generate = new EventEmitter<void>();

  styleOptions = IMAGE_STYLE_OPTIONS;
  sizeOptions = IMAGE_SIZE_OPTIONS;

  isFormValid(): boolean {
    return this.industry.trim().length > 0 && this.targetAudience.trim().length > 0;
  }

  onGenerate() {
    this.generate.emit();
  }
}

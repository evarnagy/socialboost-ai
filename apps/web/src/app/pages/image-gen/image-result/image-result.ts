import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-result.html',
  styleUrl: './image-result.css',
})
export class ImageResult {
  @Input() imageUrl: string | null = null;
}

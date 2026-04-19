import { Component, Input } from '@angular/core';
import { ImageGenHeaderData } from './image-gen-header-data';

@Component({
  selector: 'app-image-gen-header',
  standalone: true,
  imports: [],
  templateUrl: './image-gen-header.html',
  styleUrl: './image-gen-header.css',
})
export class ImageGenHeader {
  @Input() data!: ImageGenHeaderData;
}

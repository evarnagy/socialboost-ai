import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructuredPost } from '../ideas.service';

@Component({
  selector: 'app-post-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-result.html',
  styleUrl: './post-result.css',
})
export class PostResult {
  @Input() post: StructuredPost | null = null;
}
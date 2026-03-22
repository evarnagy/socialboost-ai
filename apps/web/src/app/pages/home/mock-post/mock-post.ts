import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type MockPostData = {
  title: string;
  hook: string;
  caption: string;
  cta: string;
  ctaLabel?: string;
  tags: string[];
  meta: string[];
};

@Component({
  selector: 'app-mock-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mock-post.html',
  styleUrl: './mock-post.css',
})
export class MockPost {
  @Input() data: MockPostData | null = null;
  @Input() previewLabel = 'Preview';
}

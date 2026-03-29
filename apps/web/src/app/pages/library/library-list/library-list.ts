import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteIdea } from '../../../services/favorites.service';
import { LibraryItem } from '../library-item/library-item';

@Component({
  selector: 'library-list',
  standalone: true,
  imports: [CommonModule, LibraryItem],
  templateUrl: './library-list.html',
  styleUrl: './library-list.css',
})
export class LibraryList {
  @Input() items: FavoriteIdea[] = [];
  @Input() deletingId: string | null = null;
  @Output() delete = new EventEmitter<string>();
}

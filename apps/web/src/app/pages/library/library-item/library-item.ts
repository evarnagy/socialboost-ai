import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteIdea } from '../../../services/favorites.service';

@Component({
  selector: 'library-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-item.html',
  styleUrl: './library-item.css',
})
export class LibraryItem {
  @Input() item!: FavoriteIdea;
  @Input() deletingId: string | null = null;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.item.id);
  }
}

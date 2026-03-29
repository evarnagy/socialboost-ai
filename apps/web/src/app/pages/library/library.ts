import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService, FavoriteIdea } from '../../services/favorites.service';
import { LibraryHeader } from './library-header/library-header';
import { LibraryLoading } from './library-loading/library-loading';
import { LibraryError } from './library-error/library-error';
import { LibraryEmpty } from './library-empty/library-empty';
import { LibraryList } from './library-list/library-list';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,
    LibraryHeader,
    LibraryLoading,
    LibraryError,
    LibraryEmpty,
    LibraryList,
  ],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  loading = true;
  items: FavoriteIdea[] = [];
  error = '';
  deletingId: string | null = null;

  constructor(private fav: FavoritesService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      this.items = await this.fav.listFavorites();
    } catch (e: any) {
      this.error = e?.message ?? 'Nem sikerült betölteni a kedvenceket.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async handleDelete(id: string) {
    if (!confirm('Biztos törlöd ezt a kedvencet?')) return;
    this.deletingId = id;
    this.cdr.detectChanges();
    try {
      await this.fav.removeFavorite(id);
      this.items = this.items.filter((x) => x.id !== id);
    } catch (e: any) {
      alert(e?.message ?? 'Nem sikerült törölni.');
    } finally {
      this.deletingId = null;
      this.cdr.detectChanges();
    }
  }
}
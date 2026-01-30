import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService, FavoriteIdea } from '../../services/favorites.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
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
  
  async onDelete(id: string) {
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
import { Component, Input } from '@angular/core';

@Component({
  selector: 'library-loading',
  standalone: true,
  templateUrl: './library-loading.html',
  styleUrl: './library-loading.css',
})
export class LibraryLoading {
  @Input() text = 'Betöltés…';
}

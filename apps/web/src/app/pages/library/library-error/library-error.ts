import { Component, Input } from '@angular/core';

@Component({
  selector: 'library-error',
  standalone: true,
  templateUrl: './library-error.html',
  styleUrl: './library-error.css',
})
export class LibraryError {
  @Input() error = '';
}

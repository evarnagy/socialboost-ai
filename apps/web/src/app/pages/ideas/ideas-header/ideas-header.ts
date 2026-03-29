import { Component, Input } from '@angular/core';
import { IdeasHeaderData } from './ideas-header-data';

@Component({
  selector: 'app-ideas-header',
  standalone: true,
  templateUrl: './ideas-header.html',
  styleUrl: './ideas-header.css',
})
export class IdeasHeader {
  @Input() data!: IdeasHeaderData;
}
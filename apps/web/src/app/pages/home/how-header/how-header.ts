import { Component, Input } from '@angular/core';
import { HowHeaderData } from './how-header-data';

@Component({
  selector: 'app-how-header',
  standalone: true,
  templateUrl: './how-header.html',
  styleUrl: './how-header.css',
})
export class HowHeader {
  @Input() data!: HowHeaderData;
}
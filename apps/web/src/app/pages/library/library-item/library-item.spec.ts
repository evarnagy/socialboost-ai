import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryItem } from './library-item';

describe('LibraryItem', () => {
  let component: LibraryItem;
  let fixture: ComponentFixture<LibraryItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryItem],
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryItem);
    component = fixture.componentInstance;
    component.item = { id: '1', text: 'Test', created: new Date() } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

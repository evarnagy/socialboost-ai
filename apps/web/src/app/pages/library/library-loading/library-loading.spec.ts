import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryLoading } from './library-loading';

describe('LibraryLoading', () => {
  let component: LibraryLoading;
  let fixture: ComponentFixture<LibraryLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryLoading],
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

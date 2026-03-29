import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryError } from './library-error';

describe('LibraryError', () => {
  let component: LibraryError;
  let fixture: ComponentFixture<LibraryError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryError],
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

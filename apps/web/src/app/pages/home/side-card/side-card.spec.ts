import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideCard } from './side-card';

describe('SideCard', () => {
  let component: SideCard;
  let fixture: ComponentFixture<SideCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideCard]
    }).compileComponents();

    fixture = TestBed.createComponent(SideCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and items', () => {
    component.title = 'Miért jobb így?';
    component.items = [
      { text: 'Nem "általános AI szöveg", hanem profil-alapú.' }
    ];
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.sideTitle').textContent;
    expect(title).toContain('Miért jobb így?');
  });
});

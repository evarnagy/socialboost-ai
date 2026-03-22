import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsItem } from './stats-item';

describe('StatsItem', () => {
  let component: StatsItem;
  let fixture: ComponentFixture<StatsItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsItem]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs', () => {
    component.num = '3–5';
    component.label = 'ötlet / kattintás';
    fixture.detectChanges();

    const num = fixture.nativeElement.querySelector('.statNum').textContent.trim();
    const label = fixture.nativeElement.querySelector('.muted').textContent.trim();

    expect(num).toBe('3–5');
    expect(label).toBe('ötlet / kattintás');
  });
});

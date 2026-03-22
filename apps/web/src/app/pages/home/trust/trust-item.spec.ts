import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustItem } from './trust-item';

describe('TrustItem', () => {
  let component: TrustItem;
  let fixture: ComponentFixture<TrustItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustItem]
    }).compileComponents();

    fixture = TestBed.createComponent(TrustItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs', () => {
    component.icon = '🔒';
    component.label = 'Firebase Auth';
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.trustIcon').textContent.trim();
    const label = fixture.nativeElement.querySelector('.muted').textContent.trim();

    expect(icon).toBe('🔒');
    expect(label).toBe('Firebase Auth');
  });
});

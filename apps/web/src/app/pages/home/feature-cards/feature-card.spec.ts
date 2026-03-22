import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCard } from './feature-card';

describe('FeatureCard', () => {
  let component: FeatureCard;
  let fixture: ComponentFixture<FeatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCard]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs', () => {
    component.icon = '🧩';
    component.title = 'Teszt cím';
    component.description = 'Teszt leírás';
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.featureIcon').textContent.trim();
    const title = fixture.nativeElement.querySelector('h3').textContent.trim();
    const description = fixture.nativeElement.querySelector('p').textContent.trim();

    expect(icon).toBe('🧩');
    expect(title).toBe('Teszt cím');
    expect(description).toBe('Teszt leírás');
  });
});
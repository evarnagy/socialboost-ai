import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render three feature cards', () => {
    const cardElements = fixture.nativeElement.querySelectorAll('app-feature-card');
    expect(cardElements.length).toBe(3);
  });

  it('should display feature titles from data', () => {
    const firstTitle = fixture.nativeElement.querySelector('app-feature-card h3')?.textContent?.trim();
    expect(firstTitle).toBe('Profil alapján személyre szabás');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingHeader } from './onboarding-header';
import { ONBOARDING_HEADER } from './onboarding-header-data';

describe('OnboardingHeader', () => {
  let component: OnboardingHeader;
  let fixture: ComponentFixture<OnboardingHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingHeader]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingHeader);
    component = fixture.componentInstance;
    component.data = ONBOARDING_HEADER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

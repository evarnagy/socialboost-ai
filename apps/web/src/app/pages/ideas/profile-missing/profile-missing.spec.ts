import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMissing } from './profile-missing';

describe('ProfileMissing', () => {
  let component: ProfileMissing;
  let fixture: ComponentFixture<ProfileMissing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMissing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMissing);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = {
      title: 'Nincs üzletprofilod',
      description: 'Hozd létre az üzletprofilod, hogy folytatni tudd.',
      buttonText: 'Üzletprofil létrehozása',
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
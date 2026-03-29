import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMissing } from './profile-missing';
import { ProfileMissingData } from './profile-missing-data';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
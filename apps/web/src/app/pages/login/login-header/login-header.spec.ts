import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginHeader } from './login-header';
import { LOGIN_HEADER } from './login-header-data';

describe('LoginHeader', () => {
  let component: LoginHeader;
  let fixture: ComponentFixture<LoginHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHeader]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginHeader);
    component = fixture.componentInstance;
    component.data = LOGIN_HEADER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

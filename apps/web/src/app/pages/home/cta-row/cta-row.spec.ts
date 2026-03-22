import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CtaRow } from './cta-row';
import { CtaButton } from './cta-row-data';

describe('CtaRow', () => {
  let component: CtaRow;
  let fixture: ComponentFixture<CtaRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaRow, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render buttons', () => {
    const testButtons: CtaButton[] = [
      { text: 'Click Me', type: 'primary', isClick: true },
      { text: 'Link Me', type: 'ghost', link: '/test' },
    ];
    component.buttons = testButtons;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.btn').length).toBe(2);
  });

});
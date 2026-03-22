import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Footer } from './footer';
import { FooterData } from './footer-data';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data', () => {
    const testData: FooterData = {
      copyright: 'Test Copyright',
      links: [
        { text: 'Link1', route: '/link1' },
        { text: 'Link2', route: '/link2' },
      ],
    };
    component.data = testData;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer')?.textContent).toContain('Test Copyright');
    expect(compiled.querySelectorAll('.footerLinks a').length).toBe(2);
  });
});
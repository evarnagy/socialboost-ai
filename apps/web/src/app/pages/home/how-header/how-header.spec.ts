import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowHeader } from './how-header';
import { HowHeaderData } from './how-header-data';

describe('HowHeader', () => {
  let component: HowHeader;
  let fixture: ComponentFixture<HowHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data', () => {
    const testData: HowHeaderData = {
      title: 'Test Title',
      description: 'Test Description',
    };
    component.data = testData;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Title');
    expect(compiled.querySelector('p')?.textContent).toContain('Test Description');
  });
});
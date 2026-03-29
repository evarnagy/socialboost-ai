import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdeasHeader } from './ideas-header';
import { IdeasHeaderData } from './ideas-header-data';

describe('IdeasHeader', () => {
  let component: IdeasHeader;
  let fixture: ComponentFixture<IdeasHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeasHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data', () => {
    const testData: IdeasHeaderData = {
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
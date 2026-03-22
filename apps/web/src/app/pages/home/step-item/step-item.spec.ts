import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepItem } from './step-item';

describe('StepItem', () => {
  let component: StepItem;
  let fixture: ComponentFixture<StepItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display inputs', () => {
    component.number = '1';
    component.title = 'Test Title';
    component.description = 'Test Description';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.stepNumber')?.textContent).toContain('1');
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Title');
    expect(compiled.querySelector('p')?.textContent).toContain('Test Description');
  });
});
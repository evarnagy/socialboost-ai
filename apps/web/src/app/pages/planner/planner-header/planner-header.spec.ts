import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerHeader } from './planner-header';
import { PLANNER_HEADER } from './planner-header-data';

describe('PlannerHeader', () => {
  let component: PlannerHeader;
  let fixture: ComponentFixture<PlannerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerHeader]
    }).compileComponents();

    fixture = TestBed.createComponent(PlannerHeader);
    component = fixture.componentInstance;
    component.data = PLANNER_HEADER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

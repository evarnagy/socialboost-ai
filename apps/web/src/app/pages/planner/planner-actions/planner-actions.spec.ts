import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerActions } from './planner-actions';

describe('PlannerActions', () => {
  let component: PlannerActions;
  let fixture: ComponentFixture<PlannerActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerActions]
    }).compileComponents();

    fixture = TestBed.createComponent(PlannerActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

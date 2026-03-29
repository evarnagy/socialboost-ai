import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerItem } from './planner-item';

describe('PlannerItem', () => {
  let component: PlannerItem;
  let fixture: ComponentFixture<PlannerItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerItem]
    }).compileComponents();

    fixture = TestBed.createComponent(PlannerItem);
    component = fixture.componentInstance;
    component.item = { day: 'Hétfő', text: 'Teszt poszt' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

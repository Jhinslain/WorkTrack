import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyScheduleComponent } from './modify-schedule.component';

describe('ModifyScheduleComponent', () => {
  let component: ModifyScheduleComponent;
  let fixture: ComponentFixture<ModifyScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyScheduleComponent]
    });
    fixture = TestBed.createComponent(ModifyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

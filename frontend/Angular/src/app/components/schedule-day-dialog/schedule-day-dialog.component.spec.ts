import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDayDialogComponent } from './schedule-day-dialog.component';

describe('ScheduleDayDialogComponent', () => {
  let component: ScheduleDayDialogComponent;
  let fixture: ComponentFixture<ScheduleDayDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDayDialogComponent]
    });
    fixture = TestBed.createComponent(ScheduleDayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

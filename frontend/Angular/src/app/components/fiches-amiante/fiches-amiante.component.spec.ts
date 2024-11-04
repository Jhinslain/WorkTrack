import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesAmianteComponent } from './fiches-amiante.component';

describe('FichesAmianteComponent', () => {
  let component: FichesAmianteComponent;
  let fixture: ComponentFixture<FichesAmianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichesAmianteComponent]
    });
    fixture = TestBed.createComponent(FichesAmianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

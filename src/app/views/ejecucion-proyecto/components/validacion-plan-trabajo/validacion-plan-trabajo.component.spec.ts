import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionPlanTrabajoComponent } from './validacion-plan-trabajo.component';

describe('ValidacionPlanTrabajoComponent', () => {
  let component: ValidacionPlanTrabajoComponent;
  let fixture: ComponentFixture<ValidacionPlanTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionPlanTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionPlanTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

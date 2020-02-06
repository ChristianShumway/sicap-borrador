import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPlanTrabajoComponent } from './modificar-plan-trabajo.component';

describe('ModificarPlanTrabajoComponent', () => {
  let component: ModificarPlanTrabajoComponent;
  let fixture: ComponentFixture<ModificarPlanTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPlanTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPlanTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

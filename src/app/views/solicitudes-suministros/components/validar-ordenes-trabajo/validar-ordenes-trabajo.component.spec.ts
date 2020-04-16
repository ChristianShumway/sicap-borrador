import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarOrdenesTrabajoComponent } from './validar-ordenes-trabajo.component';

describe('ValidarOrdenesTrabajoComponent', () => {
  let component: ValidarOrdenesTrabajoComponent;
  let fixture: ComponentFixture<ValidarOrdenesTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarOrdenesTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarOrdenesTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOrdenTrabajoVehiculosComponent } from './modificar-orden-trabajo-vehiculos.component';

describe('ModificarOrdenTrabajoVehiculosComponent', () => {
  let component: ModificarOrdenTrabajoVehiculosComponent;
  let fixture: ComponentFixture<ModificarOrdenTrabajoVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarOrdenTrabajoVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarOrdenTrabajoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

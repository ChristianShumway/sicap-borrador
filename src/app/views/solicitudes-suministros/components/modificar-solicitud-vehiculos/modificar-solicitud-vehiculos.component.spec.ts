import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSolicitudVehiculosComponent } from './modificar-solicitud-vehiculos.component';

describe('ModificarSolicitudVehiculosComponent', () => {
  let component: ModificarSolicitudVehiculosComponent;
  let fixture: ComponentFixture<ModificarSolicitudVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarSolicitudVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarSolicitudVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

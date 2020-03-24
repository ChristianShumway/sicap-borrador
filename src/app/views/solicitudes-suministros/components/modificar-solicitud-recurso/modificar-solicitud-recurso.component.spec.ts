import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSolicitudRecursoComponent } from './modificar-solicitud-recurso.component';

describe('ModificarSolicitudRecursoComponent', () => {
  let component: ModificarSolicitudRecursoComponent;
  let fixture: ComponentFixture<ModificarSolicitudRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarSolicitudRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarSolicitudRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReporteConceptosEjecutadosComponent } from './modificar-reporte-conceptos-ejecutados.component';

describe('ModificarReporteConceptosEjecutadosComponent', () => {
  let component: ModificarReporteConceptosEjecutadosComponent;
  let fixture: ComponentFixture<ModificarReporteConceptosEjecutadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReporteConceptosEjecutadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReporteConceptosEjecutadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

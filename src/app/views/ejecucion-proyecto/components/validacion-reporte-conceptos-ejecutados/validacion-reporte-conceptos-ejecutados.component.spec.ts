import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionReporteConceptosEjecutadosComponent } from './validacion-reporte-conceptos-ejecutados.component';

describe('ValidacionReporteConceptosEjecutadosComponent', () => {
  let component: ValidacionReporteConceptosEjecutadosComponent;
  let fixture: ComponentFixture<ValidacionReporteConceptosEjecutadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionReporteConceptosEjecutadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionReporteConceptosEjecutadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

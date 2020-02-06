import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteConceptosEjecutadosComponent } from './lista-reporte-conceptos-ejecutados.component';

describe('ListaReporteConceptosEjecutadosComponent', () => {
  let component: ListaReporteConceptosEjecutadosComponent;
  let fixture: ComponentFixture<ListaReporteConceptosEjecutadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteConceptosEjecutadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteConceptosEjecutadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

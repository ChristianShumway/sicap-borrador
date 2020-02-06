import { TestBed } from '@angular/core/testing';

import { ReporteConceptosEjecutadosService } from './reporte-conceptos-ejecutados.service';

describe('ReporteConceptosEjecutadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteConceptosEjecutadosService = TestBed.get(ReporteConceptosEjecutadosService);
    expect(service).toBeTruthy();
  });
});

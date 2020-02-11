import { TestBed } from '@angular/core/testing';

import { ReporteSubcontratoService } from './reporte-subcontrato.service';

describe('ReporteSubcontratoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteSubcontratoService = TestBed.get(ReporteSubcontratoService);
    expect(service).toBeTruthy();
  });
});
